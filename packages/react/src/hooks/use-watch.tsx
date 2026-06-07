import { useSnapshot } from 'valtio';

/**
 * Watch for Grid's state change and triggers re-render
 */
export const useWatch = <T extends object>(state: T) => useSnapshot(state);
