import Markdown, { MarkdownToJSX } from 'markdown-to-jsx';

export function convertMarkdownToJSX(value: string, options?: MarkdownToJSX.Options): JSX.Element {
  return value ? <Markdown options={options}>{value}</Markdown> : <></>;
}
