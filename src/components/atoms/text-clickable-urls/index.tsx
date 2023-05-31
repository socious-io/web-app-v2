import { TextClickableUrlsProps } from './text-clickable-urls';
import css from './text-clickable-urls.module.scss';

export const TextClickableURLs: React.FC<TextClickableUrlsProps> = ({ text }) => {
  const detectURLs = (text: string) => {
    const includesProtocols = /^(?:(?:https?|fttps?):\/\/)/g;
    const urlRegex = /^(?:(?:https?|fttps?):\/\/)?(?:www\.)?[a-zA-Z0-9]+\.[a-zA-Z]{2,}(?:\/[\w-]+)*\/?$/g;
    const newLinesBreak = /[\n\r\s\t]+/g;
    const words = text.split(newLinesBreak);

    return words.map((word, index) => {
      if (urlRegex.test(word)) {
        return (
          <a
            key={index}
            href={includesProtocols.test(word) ? word : `https://${word}`}
            target="_blank"
            className={css.link}
          >
            {' '}
            {word}
          </a>
        );
      } else {
        return ' ' + word;
      }
    });
  };
  return <>{detectURLs(text)}</>;
};
