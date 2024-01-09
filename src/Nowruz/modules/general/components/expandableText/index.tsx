import React, { useEffect, useState } from 'react';

import css from './expandableText.module.scss';
import { ExpandableTextProps } from './expandableText.types';

export const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLenght, seeMore = true, customStyle }) => {
  const [displaySeeMore, setDisplaySeeMore] = useState(seeMore);
  const [textStr, setTextStr] = useState(text);

  const truncateString = () => {
    const len = text?.length || 0;
    if (len > maxLenght) {
      let truncated = textStr?.slice(0, maxLenght);
      if (truncated.charAt(truncated.length - 1) !== ' ') {
        const idx = truncated.lastIndexOf(' ');
        truncated = truncated.slice(0, idx);
      }
      setTextStr(truncated.concat('...'));
      if (seeMore) setDisplaySeeMore(true);
    } else {
      setTextStr(text);
      setDisplaySeeMore(false);
    }
  };

  const seeMoreClick = () => {
    setTextStr(text);
    setDisplaySeeMore(false);
  };

  useEffect(() => {
    truncateString();
  }, [text]);
  return (
    <>
      <span className={`whitespace-pre-wrap ${customStyle}`}>{textStr}</span>
      {displaySeeMore && (
        <button className={css.seeMoreBtn} onClick={seeMoreClick}>
          Read more
        </button>
      )}
    </>
  );
};
