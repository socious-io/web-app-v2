import { Icon } from 'src/Nowruz/general/Icon';

import css from './creditStatus.module.scss';
import {statusType } from './status.types';

export const CreditStatus = (props:statusType) => {
    return (
        <>
            <div className={css.status}>
                <Icon name={`${props.icon}`} />
                <span className='pl-2'>{props.label}</span>
            </div>
        </>
    );
};