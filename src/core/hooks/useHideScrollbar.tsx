import { useEffect } from 'react';

const useHideScrollbar = (active: boolean, onlyMobile = false): void => {
  useEffect(() => {
    const isActive = (): boolean => {
      if (onlyMobile) return window.innerWidth < 768;
      else return true;
    };
    if (isActive()) {
      const scrollbarWidth = window.innerWidth - document.body.clientWidth;
      if (active) {
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth) document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0';
      }
    }
  }, [active, onlyMobile]);
};

export default useHideScrollbar;
