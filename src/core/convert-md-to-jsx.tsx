import Markdown from 'markdown-to-jsx';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';

interface CustomLinkProps {
  children: ReactNode;
  href: string;
}
const CustomLink: React.FC<CustomLinkProps> = ({ children, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

CustomLink.propTypes = {
  children: PropTypes.node.isRequired,
  href: PropTypes.string.isRequired,
};

const options = {
  overrides: {
    a: {
      component: CustomLink,
    },
  },
};
export function convertMarkdownToJSX(value: string): JSX.Element {
  if (!value) return <></>;
  const modifiedVal = value.replaceAll('<br/>', '  \n');
  try {
    return <Markdown options={options}>{modifiedVal}</Markdown>;
  } catch (error) {
    console.error('Markdown rendering failed:', error);
    return <pre>{modifiedVal}</pre>;
  }
}
