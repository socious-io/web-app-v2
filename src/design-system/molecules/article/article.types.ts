import {CSSProperties} from 'react';

export type ArticleProps = {
  title: string;
  body: React.ReactNode;
  className?: string;
  style?: CSSProperties;
};
