import { describe, expect, it } from 'vitest';
import { experience, navItems, profile, projects, roadmap, yearsOfExperience } from '../src/data/portfolio.js';

// Guards against content mistakes slipping onto the live site.
describe('portfolio content', () => {
  it('has complete case studies', () => {
    for (const project of projects) {
      for (const field of ['slug', 'title', 'summary', 'problem', 'approach', 'outcome']) {
        expect(project[field], `${project.slug}.${field}`).toBeTruthy();
      }
      expect(project.stack.length).toBeGreaterThan(0);
      expect(project.image || project.visual, `${project.slug} needs an image or visual`).toBeTruthy();
    }
  });

  it('uses unique slugs', () => {
    const slugs = [...projects, ...roadmap].map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('only links to https URLs', () => {
    const urls = [
      ...Object.values(profile.links),
      ...projects.flatMap((p) => Object.values(p.links)),
    ];
    for (const url of urls) expect(url).toMatch(/^https:\/\//);
  });

  it('keeps roadmap items clearly marked as not shipped', () => {
    for (const item of roadmap) expect(['Planned', 'Researching', 'In progress']).toContain(item.status);
  });

  it('marks exactly one current role and computes experience', () => {
    expect(experience.filter((job) => job.current)).toHaveLength(1);
    expect(yearsOfExperience).toBeGreaterThanOrEqual(5);
  });

  it('has a section for every nav item id', () => {
    expect(navItems.map((n) => n.id)).toEqual(['work', 'experience', 'stack', 'lab', 'next', 'about', 'contact']);
  });
});
