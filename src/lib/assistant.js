/** Lets any button open the AI assistant without sharing React state. */
export const ASSISTANT_OPEN_EVENT = 'assistant:open';

export const openAssistant = () => window.dispatchEvent(new Event(ASSISTANT_OPEN_EVENT));
