import { useEffect } from 'react';

const useDetectOutside = (ref, onClick: () => void) => {
  useEffect(() => {
    function handleClickOutside(event) {
      const ignoreClick = document.querySelector('[data-ignore-outside-click="true"]');
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest('[aria-modal="true"][role="dialog"]') &&
        !ignoreClick
      ) {
        onClick();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
};

export default useDetectOutside;
