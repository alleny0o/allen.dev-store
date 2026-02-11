import {useAside} from './use-aside';

/**
 * Convenience hook for closing the aside.
 * Exit animation is handled by AnimatePresence in the aside component —
 * no closing state or timing hacks needed here.
 */
export function useAsideClose() {
  const {close} = useAside();
  return {handleClose: close};
}