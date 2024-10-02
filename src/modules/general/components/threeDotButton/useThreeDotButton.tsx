import { useState } from 'react';

export const useInitiateDisputeButton = () => {
  const [openMenu, setOpenMenu] = useState(false);
  return { openMenu, setOpenMenu };
};
