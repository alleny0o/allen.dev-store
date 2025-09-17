import { useState } from 'react';
import { useAside } from './use-aside';

export const useAsideClose = () => {
  const { close: ctxClose } = useAside();
  const [closing, setClosing] = useState(false);

  const handleClose = () => {
    setClosing(true);
    ctxClose();
    requestAnimationFrame(() => setClosing(false));
  };

  return { handleClose, closing, setClosing };
};