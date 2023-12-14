import React, { useState } from 'react';
import { OrgOfferModal } from 'src/Nowruz/modules/Jobs/containers/OrgOfferModal';

export const Test = () => {
  const [open, setOpen] = useState(true);
  return (
    <div className="h-[1200px]">
      Test
      <OrgOfferModal onClose={() => setOpen(false)} open={open} />
    </div>
  );
};
