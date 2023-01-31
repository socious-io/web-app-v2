import css from './three-dots-button.module.scss';
import { ThreeDotsButtonProps } from './three-dots-button.types';

export const ThreeDotsButton = (props: ThreeDotsButtonProps): JSX.Element => {
  return (
    <div onClick={props.onClick} className={css.container}>
      <img src="/icons/three-dots-blue.svg" />
    </div>
  );
};
