import React, { useState, useEffect } from 'react';
import { TextClickableURLs } from 'src/components/atoms/text-clickable-urls';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';
import { printWhen } from 'src/core/utils';

import css from './expandableText.module.scss';
import { ExpandableTextProps } from './expandableText.types';

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  expectedLength = 200,
  clickableUrls = true,
  isMarkdown = false,
  seeMoreButton = true,
}) => {
  const initialText = text.length > expectedLength ? text.slice(0, expectedLength) + '...' : text;
  const [maintext, setMainText] = useState(text);
  const expect = text.slice(0, expectedLength);
  const viewMoreCondition = expect.length < text.length;
  const [shouldViewMore, setShouldViewMore] = useState(viewMoreCondition);

  const toggleExpect = (): void => {
    if (maintext !== text) {
      setMainText(text);
    } else {
      setMainText(initialText);
    }
    setShouldViewMore(!shouldViewMore);
  };

  useEffect(() => {
    setShouldViewMore(viewMoreCondition);
    setMainText(expect);
  }, [text]);

  useEffect(() => {
    const newText = text.length > expectedLength ? text.slice(0, expectedLength) + '...' : text;
    setShouldViewMore(text.length > expectedLength);
    setMainText(newText);
  }, [text, expectedLength]);

  const renderText = () => {
    if (clickableUrls && !isMarkdown) {
      return <TextClickableURLs text={maintext} />;
    } else if (isMarkdown) {
      return convertMarkdownToJSX(maintext);
    }
    return maintext;
  };

  return (
    <div className={css.expect}>
      {renderText()}
      {seeMoreButton && printWhen(
        <span className={css.expect__seeMore} onClick={toggleExpect}>
          see more
        </span>,
        shouldViewMore,
      )}
    </div>
  );
};
