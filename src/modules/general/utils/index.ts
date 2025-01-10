import { useEffect, useState } from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';

export const useSeeMore = (copy: string, expectedLength?: number) => {
  const [seeMore, setSeeMore] = useState(false);
  const [copyProcessed, setCopyProcessed] = useState(copy);

  useEffect(() => {
    truncateString();
  }, [copy]);

  const truncateString = () => {
    const len = copy?.length || 0;
    const maxLen = expectedLength || (isTouchDevice() ? 160 : 360);

    if (copy && len <= maxLen) {
      setCopyProcessed(copy);
      setSeeMore(false);
      return;
    }

    if (copy && len > maxLen) {
      let truncated = copy?.slice(0, maxLen);
      if (truncated.charAt(truncated.length - 1) !== ' ') {
        const idx = truncated.lastIndexOf(' ');
        truncated = truncated.slice(0, idx);
      }
      setCopyProcessed(truncated.concat('...'));
      setSeeMore(true);
    }
  };

  const handleSeeMore = () => {
    setCopyProcessed(copy);
    setSeeMore(false);
  };

  return {
    data: { seeMore, copyProcessed },
    operations: { handleSeeMore },
  };
};
