import { CSSProperties } from 'react';

export interface TwoColumnCursorProps extends CSSProperties {
  children: [React.ReactNode, React.ReactNode] | [React.ReactNode];
  visibleSidebar?: boolean;
}
