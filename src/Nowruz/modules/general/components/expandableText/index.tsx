import React, { useState, useEffect } from 'react';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';
import { printWhen } from 'src/core/utils';

import css from './expandableText.module.scss';
import { ExpandableTextProps } from './expandableText.types';
import { TextClickableURLs } from '../textClickableUrls';

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  seeMoreText = 'see more',
  expectedLength = 200,
  clickableUrls = true,
  isMarkdown = false,
  seeMoreButton = true,
  customStyle = '',
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
    <div className={`${css.expect} ${customStyle}`}>
      {renderText()}
      {seeMoreButton &&
        printWhen(
          <span className={css.expect__seeMore} onClick={toggleExpect}>
            {seeMoreText}
          </span>,
          shouldViewMore,
        )}
    </div>
  );
};
