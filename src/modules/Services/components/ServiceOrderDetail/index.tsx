import { Divider } from '@mui/material';
import { StatusKeys } from 'src/constants/CONTRACTS_STATUS';
import { CURRENCY_SIGNS } from 'src/constants/PAYMENT_CURRENCY';
import { translate } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { Icon } from 'src/modules/general/components/Icon';
import Status from 'src/modules/general/components/Status';
import { StatusProps } from 'src/modules/general/components/Status/index.types';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceOrderDetailProps } from './index.types';

const ServiceOrderDetail: React.FC<ServiceOrderDetailProps> = ({
  service,
  orderPayment,
  orderStatus = null,
  buttonName = '',
  onButtonClick,
}) => {
  const { name, price, currency, identity, description, skills, delivery, payment = 'FIAT' } = service || {};
  const { feePercentage, fee, total } = orderPayment;
  const { status, orderId, date } = orderStatus || {};

  const generatePriceFormat = (price: string | number, currency: string) =>
    `${CURRENCY_SIGNS[currency] || ''}${price} ${currency}`;

  const renderStatus: Record<StatusKeys, StatusProps> = {
    PENDING: {
      label: 'Pending',
      theme: 'warning',
      icon: 'dot',
    },
  };

  return (
    <div className={styles['container']}>
      <div className={styles['card']}>
        <span className={styles['card__header']}>{name}</span>
        <AvatarLabelGroup account={identity as AccountItem} customStyle="!p-0" />
        {description && (
          <ExpandableText
            seeMoreButton={false}
            text={description}
            isMarkdown
            customStyle={styles['card__description']}
          />
        )}
        <div className={styles['card__skills']}>
          {skills.map(item => (
            <Chip key={item} label={translate(item)} theme="grey_blue" size="md" customStyle={styles['skill']} />
          ))}
        </div>
        <div className={styles['card__bottom']}>
          <div className={styles['card__row']}>
            <Icon name="hourglass-03" fontSize={20} color={variables.color_grey_700} />
            {translate(`service-form.delivery-options.${delivery}`)} {translate('service-card.delivery')}
          </div>
          <div className={styles['card__row']}>
            {payment === 'FIAT' ? (
              <Icon name="currency-dollar-circle" fontSize={20} color={variables.color_grey_700} />
            ) : (
              <img src={`/icons/crypto/${currency?.toString()}.svg`} width={20} alt={currency} />
            )}
            {generatePriceFormat(price, currency)}
            {payment === 'FIAT' && (
              <span className={styles['card__row--lighter']}>{translate('service-detail.fixed')}</span>
            )}
          </div>
        </div>
        {orderStatus && (
          <>
            <Divider />
            <div className={`${styles['card__bottom']} !gap-6`}>
              {status && (
                <div className={styles['order']}>
                  {translate('service-detail.order.status')}
                  <Status {...renderStatus[status]} />
                </div>
              )}
              <div className={styles['order']}>
                {translate('service-detail.order.number')}
                <span className={styles['order__value']}>{orderId}</span>
              </div>
              <div className={styles['order']}>
                {translate('service-detail.order.date')}
                <span className={styles['order__value']}>{date}</span>
              </div>
            </div>
          </>
        )}
      </div>
      {!orderStatus && (
        <>
          <Divider />
          <div className={styles['payment']}>
            <div className={styles['payment__fee']}>
              {translate('service-detail.order.fee')} ({feePercentage}%)
              <span>{generatePriceFormat(fee, currency)}</span>
            </div>
            <div className={styles['payment__total']}>
              {translate('service-detail.order.total')}
              <span>{generatePriceFormat(total, currency)}</span>
            </div>
          </div>
          <Divider />
          {buttonName && (
            <Button color="primary" variant="contained" customStyle="w-full" onClick={onButtonClick}>
              {buttonName}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceOrderDetail;
