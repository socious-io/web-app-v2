import Markdown from 'markdown-to-jsx';

const CustomLink = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

const options = {
  overrides: {
    a: {
      component: CustomLink,
    },
  },
};
export function convertMarkdownToJSX(value: string): JSX.Element {
  return value ? <Markdown options={options}>{value}</Markdown> : <></>;
}
