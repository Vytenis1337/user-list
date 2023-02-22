import { useCallback, useEffect } from 'react';

const MOUSE_UP = 'mouseup';

export const useOutsideClick = (closeModal, ref) => {
  const handleClick = useCallback(
    ({ target }) => {
      if (ref?.current?.contains && !ref.current.contains(target)) {
        closeModal();
      }
    },
    [closeModal, ref]
  );

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
};
