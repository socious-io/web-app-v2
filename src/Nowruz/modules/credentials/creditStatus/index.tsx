import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';

import css from './creditStatus.module.scss';
import { statusType } from './status.types';

export const CreditStatus = (props: statusType) => {
  const color = () => {
    switch (props.color) {
      case 'PENDING':
        return variables.color_grey_500;
      case 'APPROVED':
        return variables.color_success_500;
      case 'SENT':
        return variables.color_primary_500;
      case 'REJECTED':
        return variables.color_error_500;
      case 'CLAIMED':
        return variables.color_warning_300;
    }
  };
  return (
    <>
      <div className={css.status} style={{'borderColor':color()}}>
        <Icon name={props.icon} color={color()} />
        <span className="pl-2">{props.label}</span>
      </div>
    </>
  );
};
