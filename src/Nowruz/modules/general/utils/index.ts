import { useEffect, useState } from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useSeeMore = (copy: string) => {
  const [seeMore, setSeeMore] = useState(false);
  const [copyProccessed, setCopyProccessed] = useState(copy);

  const truncateString = () => {
    const len = copy?.length || 0;
    const maxLen = isTouchDevice() ? 160 : 360;

    if (copy && len <= maxLen) {
      setCopyProccessed(copy);
      setSeeMore(false);
      return;
    }

    if (copy && len > maxLen) {
      let truncated = copy?.slice(0, maxLen);
      if (truncated.charAt(truncated.length - 1) !== ' ') {
        const idx = truncated.lastIndexOf(' ');
        truncated = truncated.slice(0, idx);
      }
      setCopyProccessed(truncated.concat('...'));
      setSeeMore(true);
    }
  };

  const handleSeeMore = () => {
    setCopyProccessed(copy);
    setSeeMore(false);
  };

  useEffect(() => {
    truncateString();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [copy]);

  return {
    data: { seeMore, copyProccessed },
    operations: { handleSeeMore },
  };
};
