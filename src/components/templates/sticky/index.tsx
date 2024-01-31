import css from './sticky.module.scss';
import { StickyProps } from './sticky.types';

//TODO: generilze more with check designs
export const Sticky: React.FC<StickyProps> = ({ children, containerClassName = '' }) => {
  return <div className={`${css['container']} ${containerClassName}`}>{children}</div>;
};
