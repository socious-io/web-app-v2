import { CircularProgress, Divider } from '@mui/material';
import { CONTRACT_STATUS } from 'src/constants/CONTRACTS_STATUS';
import { CURRENCY_SIGNS } from 'src/constants/PAYMENT_CURRENCY';
import { translate } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { Icon } from 'src/modules/general/components/Icon';
import Status from 'src/modules/general/components/Status';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceOrderDetailProps } from './index.types';

const ServiceOrderDetail: React.FC<ServiceOrderDetailProps> = ({
  service,
  orderPayment,
  orderStatus = null,
  buttonName = '',
  disabledButton = false,
  loadingButton = false,
  onButtonClick,
}) => {
  const { name, price, currency, identity, description, skills, delivery, payment } = service || {};
  const { feePercentage, fee, total } = orderPayment;
  const { status, orderId, date } = orderStatus || {};

  const generatePriceFormat = (price: string | number, currency: string) =>
    `${CURRENCY_SIGNS[currency] || ''}${price} ${currency}`;

  return (
    <div className={styles['container']}>
      <div className={styles['card']}>
        <span className={styles['card__header']}>{name}</span>
        <AvatarLabelGroup account={identity as AccountItem} customStyle="!p-0" avatarSize="48px" />
        <ExpandableText seeMoreButton={false} text={description} isMarkdown customStyle={styles['card__description']} />
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
              <Icon
                name={`currency-${currency.name === 'USD' ? 'dollar' : 'yen'}-circle`}
                fontSize={20}
                color={variables.color_grey_700}
              />
            ) : (
              <img src={`/icons/crypto/${currency.symbol}.svg`} width={20} alt={currency.name} />
            )}
            {price} {currency.name}
          </div>
        </div>
        {orderStatus && (
          <>
            <Divider />
            <div className={styles['order']}>
              {status && (
                <div className={styles['order__label']}>
                  {translate('service-detail.order.status')}
                  <Status {...CONTRACT_STATUS[status]} />
                </div>
              )}
              <div className={styles['order__label']}>
                {translate('service-detail.order.number')}
                <span className={styles['order__value']}>{orderId}</span>
              </div>
              <div className={styles['order__label']}>
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
              <span>{generatePriceFormat(fee, currency.name)}</span>
            </div>
            <div className={styles['payment__total']}>
              {translate('service-detail.order.total')}
              <span>{generatePriceFormat(total, currency.name)}</span>
            </div>
          </div>
          <Divider />
          {buttonName && (
            <Button
              color="primary"
              variant="contained"
              customStyle="w-full"
              disabled={disabledButton}
              onClick={onButtonClick}
            >
              {loadingButton && <CircularProgress size="16px" sx={{ color: variables.color_white }} />}
              {buttonName}
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default ServiceOrderDetail;
