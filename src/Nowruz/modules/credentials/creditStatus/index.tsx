import { Icon } from 'src/Nowruz/general/Icon';
import variables from 'src/components/_exports.module.scss';
import css from './creditStatus.module.scss';
import { statusType } from './status.types';

export const CreditStatus = (props: statusType) => {
  const color = () => {
    switch (props.color) {
      case 'gray':
        return variables.color_grey_500;
      case 'green':
        return variables.color_green_500;
      case 'red':
        return variables.color_red_500;
    }
  };
  return (
    <>
      <div className={css.status} color={css.color}>
        <Icon name={props.icon} color={color()} />
        <span className="pl-2">{props.label}</span>
      </div>
    </>
  );
};
