import React from 'react';
import { SearchModal } from 'src/Nowruz/modules/Search/containers/SearchModal';

export const Test = () => {
  return (
    <div className="h-[1200px]">
      Test
      <SearchModal open={true} onClose={() => console.log} />
    </div>
  );
};
