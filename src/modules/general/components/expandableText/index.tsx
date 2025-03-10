import React, { useState, useEffect } from 'react';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';
import { printWhen } from 'src/core/utils';

import css from './expandableText.module.scss';
import { ExpandableTextProps } from './expandableText.types';
import { TextClickableURLs } from '../textClickableUrls';

const stripHtml = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
};

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  seeMoreText = 'see more',
  expectedLength = 200,
  clickableUrls = true,
  isMarkdown = false,
  seeMoreButton = true,
  preview = false,
  customStyle = '',
}) => {
  const textContent = preview ? stripHtml(text) : text;
  const isTextLong = textContent.length > expectedLength;
  const initialText = isTextLong ? textContent.slice(0, expectedLength) + '...' : textContent;
  const [mainText, setMainText] = useState(initialText);
  const [shouldViewMore, setShouldViewMore] = useState(isTextLong);

  useEffect(() => {
    setMainText(initialText);
    setShouldViewMore(isTextLong);
  }, [text, expectedLength]);

  const renderText = () => {
    if (isMarkdown) return convertMarkdownToJSX(mainText);
    if (clickableUrls) return <TextClickableURLs text={mainText} />;
    return mainText;
  };

  const toggleExpect = (): void => {
    setMainText(prev => (prev === text ? initialText : text));
    setShouldViewMore(prev => !prev);
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
