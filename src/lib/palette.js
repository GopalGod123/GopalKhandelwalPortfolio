/** Opens the command palette from anywhere (navbar button, shortcuts). */
export const PALETTE_OPEN_EVENT = 'palette:open';

export const openPalette = () => window.dispatchEvent(new Event(PALETTE_OPEN_EVENT));
