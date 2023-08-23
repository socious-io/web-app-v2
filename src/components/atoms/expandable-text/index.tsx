import { useState, useEffect } from 'react';
import { printWhen } from 'src/core/utils';
import { TextClickableURLs } from '../text-clickable-urls';
import { ExpandableTextProps } from './expandable-text.types';
import { convertMarkdownToJSX } from 'src/core/convert-md-to-jsx';
import css from './expandable-text.module.scss';
import { removeIncompleteOpeningTags } from 'src/core/remove-incomplete-tags';

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  expectedLength = 200,
  clickableUrls = true,
  isMarkdown = false,
}) => {
  const [mainText, setMainText] = useState(text);

  const expect = removeIncompleteOpeningTags(text.slice(0, expectedLength));
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
      return <TextClickableURLs text={mainText} />;
    } else if (isMarkdown) {
      return convertMarkdownToJSX(mainText);
    }
    return mainText;
  };

  return (
    <div className={css.expect}>
      {renderText()}
      {printWhen(<>... </>, mainText.length < text.length)}
      {printWhen(
        <span className={css.expect__seeMore} onClick={toggleExpect}>
          See more
        </span>,
        shouldViewMore
      )}
    </div>
  );
};
