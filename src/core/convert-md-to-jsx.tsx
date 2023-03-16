import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

function convertMarkdownToJSX(value: string, options?: MarkdownToJSX.Options): JSX.Element {
  return value ? <Markdown options={options}>{value}</Markdown> : <></>;
}

export function convertMDToJSX(md: string, options: { length: number | null }) {
  if (options.length === null) {
    return convertMarkdownToJSX(md);
  }
  if (md.length > options.length) {
    return convertMarkdownToJSX(md.slice(0, options.length) + '...', { wrapper: 'article' });
  }
  return convertMarkdownToJSX(md);
}
