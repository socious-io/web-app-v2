import css from './header.module.scss';
import {HeaderProps} from './header.types';
// import IconRight from '/asset/icons/IconRight.svg';

export const Header = (props: HeaderProps): JSX.Element => {
  return (
    <header
      style={props?.style}
      className={`${css.container} ${props?.className}`}
    >
      <div className={css.imgContainer} onClick={props.onBackBtnClick}>
        {/* <img
          width={38}
          className={css.img}
          src={IconRight}
          alt="back button icon"
        /> */}
      </div>
    </header>
  );
};
