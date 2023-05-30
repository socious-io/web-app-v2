import { useState, useEffect } from 'react';
import { printWhen } from 'src/core/utils';
import { TextClickableURLs } from '../text-clickable-urls';
import { ExpandableTextProps } from './expandable-text.types';
import css from './expandable-text.module.scss';

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  expectedLength = 200,
  clickableUrls = true,
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

  return (
    <div className={css.expect}>
      {clickableUrls ? <TextClickableURLs text={maintext} /> : maintext}
      {printWhen(<>... </>, maintext.length < text.length)}
      {printWhen(
        <span className={css.expect__seeMore} onClick={toggleExpect}>
          See more
        </span>,
        shouldViewMore
      )}
    </div>
  );
};
