import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@/hooks/useTheme';
import * as THREE from 'three';

// Three.js radar-style demo:
// - Random target motion
// - Speed/direction based prediction line
// - Interceptor missile animation
// - Hit/Miss collision detection
export default function RadarInterceptionDemo() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const mountRef = useRef(null);
  const rendererRef = useRef(null);
  const rafRef = useRef(null);
  const cleanupRef = useRef(() => {});
  const launchRef = useRef(null);
  const resetRef = useRef(null);

  const [status, setStatus] = useState('Ready');
  const [launchCount, setLaunchCount] = useState(0);

  // Simulation parameters (kept simple for portfolio demo).
  const params = useMemo(
    () => ({
      radarRadius: 100,
      targetCount: 1, // keep it mini + readable
      targetSpeed: 28, // units/sec
      missileSpeed: 55, // units/sec
      predictionHorizon: 1.2, // seconds for path prediction
      hitDistance: 4.5,
      maxMissileTime: 4.0,
      sweepSpeed: 1.25, // radians/sec
    }),
    []
  );

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = Math.max(300, container.clientWidth || 300);
    const height = Math.max(220, container.clientHeight || 220);

    const scene = new THREE.Scene();
    const radarRadius = params.radarRadius;

    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      -radarRadius,
      radarRadius,
      radarRadius / aspect,
      -radarRadius / aspect,
      0.1,
      1000
    );
    camera.position.set(0, 160, 0);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Helpers
    const gridGroup = new THREE.Group();
    scene.add(gridGroup);

    const sweepGroup = new THREE.Group();
    scene.add(sweepGroup);

    // Radar ring
    const ringGeom = new THREE.RingGeometry(radarRadius * 0.92, radarRadius, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: isDark ? 0x7dd3fc : 0x0369a1,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeom, ringMat);
    ring.rotation.x = Math.PI / 2; // x-z plane
    scene.add(ring);

    // Subtle axis lines
    const axisMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x6c736d : 0x7c827b,
      transparent: true,
      opacity: 0.4,
    });
    const axisPoints = [
      new THREE.Vector3(-radarRadius, 0, 0),
      new THREE.Vector3(radarRadius, 0, 0),
      new THREE.Vector3(0, 0, -radarRadius),
      new THREE.Vector3(0, 0, radarRadius),
    ];
    const axisGeom = new THREE.BufferGeometry().setFromPoints(axisPoints);
    const axisLines = new THREE.LineSegments(axisGeom, axisMat);
    scene.add(axisLines);

    // Sweep line (rotates around Y axis in x-z plane)
    const sweepMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x7dd3fc : 0x0369a1,
      transparent: true,
      opacity: 0.9,
    });
    const sweepGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(radarRadius, 0, 0),
    ]);
    const sweepLine = new THREE.Line(sweepGeom, sweepMat);
    sweepGroup.add(sweepLine);

    // Prediction line (updates on missile launch)
    const predictionMat = new THREE.LineBasicMaterial({
      color: isDark ? 0xe6f2ff : 0x08162a,
      transparent: true,
      opacity: 0.95,
    });
    const predictionGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const predictionLine = new THREE.Line(predictionGeom, predictionMat);
    scene.add(predictionLine);

    // Targets (moving points on radar plane)
    const targetGeometry = new THREE.SphereGeometry(2.6, 18, 18);
    const targetMaterial = new THREE.MeshBasicMaterial({
      color: 0xfb7185,
    });

    const targets = new Array(params.targetCount).fill(null).map(() => {
      const mesh = new THREE.Mesh(targetGeometry, targetMaterial);
      mesh.position.set(0, 0, 0);
      scene.add(mesh);
      return {
        mesh,
        pos: new THREE.Vector3(),
        vel: new THREE.Vector3(),
        speed: params.targetSpeed,
        angle: 0,
      };
    });

    // Missile (animated when launched)
    const missileGeometry = new THREE.SphereGeometry(3.3, 18, 18);
    const missileMaterial = new THREE.MeshBasicMaterial({
      color: isDark ? 0x7dd3fc : 0x0369a1,
    });
    const missile = new THREE.Mesh(missileGeometry, missileMaterial);
    missile.position.set(0, 0, 0);
    scene.add(missile);

    const missileTrailMat = new THREE.LineBasicMaterial({
      color: isDark ? 0x7dd3fc : 0x0369a1,
      transparent: true,
      opacity: 0.7,
    });
    const missileTrailGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const missileTrail = new THREE.Line(missileTrailGeom, missileTrailMat);
    scene.add(missileTrail);

    let sweepAngle = 0;

    let missileActive = false;
    let missileTime = 0;
    let predictedPos = new THREE.Vector3();

    function spawnTarget(t) {
      // Random angle + radius so target stays inside the ring.
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * (radarRadius * 0.7) + radarRadius * 0.12;

      const pos = new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
      // Direction is also random; this gives speed & direction.
      const dirAngle = Math.random() * Math.PI * 2;
      const vel = new THREE.Vector3(Math.cos(dirAngle) * t.speed, 0, Math.sin(dirAngle) * t.speed);

      t.pos.copy(pos);
      t.vel.copy(vel);
      t.mesh.position.copy(pos);
      t.angle = dirAngle;
    }

    targets.forEach(spawnTarget);

    function resetPrediction() {
      predictionGeom.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
      predictionGeom.attributes.position.needsUpdate = true;
    }

    resetPrediction();

    function resetMissile() {
      missileActive = false;
      missileTime = 0;
      missile.position.set(0, 0, 0);
      missileTrailGeom.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
      missileTrailGeom.attributes.position.needsUpdate = true;
      predictedPos = new THREE.Vector3();
      setStatus('Ready');
    }

    resetMissile();

    function launchMissile() {
      // Compute predicted position using constant velocity model.
      const t = targets[0];
      const targetPos = t.pos.clone();
      const targetVel = t.vel.clone();

      predictedPos = targetPos.add(targetVel.multiplyScalar(params.predictionHorizon));

      // Clamp prediction endpoint into radar bounds for visuals.
      const predR = Math.sqrt(predictedPos.x * predictedPos.x + predictedPos.z * predictedPos.z);
      if (predR > radarRadius * 0.95) {
        predictedPos.multiplyScalar((radarRadius * 0.95) / predR);
      }

      // Path prediction line: current position -> predicted position.
      predictionGeom.setFromPoints([targetPos, predictedPos]);
      predictionGeom.attributes.position.needsUpdate = true;

      missile.position.set(0, 0, 0);
      missileTime = 0;
      missileActive = true;
      setLaunchCount((c) => c + 1);
      setStatus('Launching...');
    }

    // Exported to UI
    function onTick(dt) {
      // Update sweep
      sweepAngle += params.sweepSpeed * dt;
      sweepGroup.rotation.y = sweepAngle;

      // Move targets
      for (const t of targets) {
        t.pos.add(t.vel.clone().multiplyScalar(dt));

        // Simple boundary bounce.
        const r = Math.sqrt(t.pos.x * t.pos.x + t.pos.z * t.pos.z);
        if (r > radarRadius * 0.92) {
          // Push back to boundary and reflect velocity.
          const push = (radarRadius * 0.92) / r;
          t.pos.multiplyScalar(push);
          // Reflect direction around normal.
          const n = t.pos.clone().normalize();
          const v = t.vel.clone();
          t.vel.copy(v.sub(n.multiplyScalar(2 * v.dot(n))));
        }

        t.mesh.position.copy(t.pos);
      }

      // Missile motion
      if (missileActive) {
        missileTime += dt;
        const t = targets[0];

        // Pursue predicted point with fixed missile speed.
        const toPred = predictedPos.clone().sub(missile.position);
        const distance = toPred.length();
        const dir = distance > 1e-6 ? toPred.multiplyScalar(1 / distance) : new THREE.Vector3(0, 0, 0);

        missile.position.add(dir.multiplyScalar(params.missileSpeed * dt));

        // Missile trail (center -> missile)
        missileTrailGeom.setFromPoints([new THREE.Vector3(0, 0, 0), missile.position.clone()]);
        missileTrailGeom.attributes.position.needsUpdate = true;

        // Collision detect
        const hitDist = missile.position.distanceTo(t.pos);
        if (hitDist <= params.hitDistance) {
          missileActive = false;
          setStatus('Hit');
          return;
        }

        const missileR = Math.sqrt(missile.position.x * missile.position.x + missile.position.z * missile.position.z);
        const tooLong = missileTime > params.maxMissileTime;
        const outOfRadar = missileR > radarRadius * 1.02;
        if (tooLong || outOfRadar) {
          missileActive = false;
          setStatus('Miss');
        }
      }
    }

    let last = performance.now();
    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      onTick(dt);
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(loop);
    };

    const resize = () => {
      const w = Math.max(300, container.clientWidth || 300);
      const h = Math.max(220, container.clientHeight || 220);
      renderer.setSize(w, h);
      const a = w / h;
      camera.left = -radarRadius;
      camera.right = radarRadius;
      camera.top = radarRadius / a;
      camera.bottom = -radarRadius / a;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', resize);

    // Only animate while visible — no GPU work when scrolled away.
    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(loop);
      } else if (!entry.isIntersecting && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    });
    visibility.observe(container);

    // Cleanup
    cleanupRef.current = () => {
      window.removeEventListener('resize', resize);
      visibility.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      launchRef.current = null;
      resetRef.current = null;

      renderer.dispose();
      try {
        container.removeChild(renderer.domElement);
      } catch {
        // ignore
      }

      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) obj.material.dispose?.();
      });
    };

    // Wire UI buttons via refs.
    launchRef.current = launchMissile;
    resetRef.current = () => {
      targets.forEach(spawnTarget);
      resetPrediction();
      resetMissile();
      setLaunchCount(0);
    };

    return () => cleanupRef.current();
  }, [isDark, params]);

  return (
    <div className="min-w-0">
      <div className="grid-bg relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-soft sm:aspect-[16/10]">
        <div ref={mountRef} className="absolute inset-0" />
        <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-line bg-elev/85 px-3 py-2 font-mono text-[11px] leading-relaxed text-muted backdrop-blur">
          <div className="text-ink">RADAR · SWEEP ACTIVE</div>
          <div>Target · tracking</div>
          <div>
            Interceptor ·{' '}
            <span className={status === 'Hit' ? 'text-accent-text' : status === 'Miss' ? 'text-[#fb7185]' : 'text-ink'}>{status}</span>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-line bg-elev/85 px-3 py-1.5 font-mono text-[11px] text-muted backdrop-blur">
          Launches · <span className="tabular-nums text-ink">{launchCount}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn-accent" onClick={() => launchRef.current?.()}>
          Launch interceptor
        </button>
        <button type="button" className="btn-ghost" onClick={() => resetRef.current?.()}>
          Reset scenario
        </button>
      </div>
    </div>
  );
}
