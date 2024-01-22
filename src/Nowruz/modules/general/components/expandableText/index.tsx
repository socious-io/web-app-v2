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
}) => {
  const [maintext, setMainText] = useState(text);
  const expect = text.slice(0, expectedLength);
  const viewMoreCondition = expect.length < text.length;
  const [shouldViewMore, setShouldViewMore] = useState(viewMoreCondition);

  const toggleExpect = (): void => {
    setMainText(text);
    setShouldViewMore(!shouldViewMore);
  };

  useEffect(() => {
    setShouldViewMore(viewMoreCondition);
    setMainText(expect);
  }, [text]);

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
      {printWhen(<>... </>, maintext.length < text.length)}
      {printWhen(
        <span className={css.expect__seeMore} onClick={toggleExpect}>
          See more
        </span>,
        shouldViewMore,
      )}
    </div>
  );
};
