import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { config } from 'src/config';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { Icon } from 'src/modules/general/components/Icon';
import CopyLink from 'src/modules/general/containers/CopyLink';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceDetailBoxProps } from './index.types';

const ServiceDetailBox: React.FC<ServiceDetailBoxProps> = ({ serviceDetail, onPurchase, customStyle = '' }) => {
  const { pathname } = useLocation();
  const { t: translate } = useTranslation();
  const { skills, delivery, price, currency, payment } = serviceDetail || {};
  const url = config.appBaseURL + pathname.substring(1);

  return (
    <div className={`${styles['container']} ${customStyle}`}>
      <span className={styles['header']}>{translate('service-detail.about')}</span>
      <div className={styles['skills']}>
        {skills.map(item => (
          <Chip key={item} label={translate(item)} theme="grey_blue" size="md" customStyle={styles['skill']} />
        ))}
      </div>
      <div className={styles['col']}>
        <div className={styles['row']}>
          <Icon name="hourglass-03" fontSize={20} color={variables.color_grey_700} />
          {translate(`service-form.delivery-options.${delivery}`)} {translate('service-card.delivery')}
        </div>
        <div className={styles['row']}>
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
          {payment === 'FIAT' && <span className={styles['row--lighter']}>{translate('service-detail.fixed')}</span>}
        </div>
      </div>
      <CopyLink link={url} onCopy={() => navigator.clipboard.writeText(url)} />
      {onPurchase && (
        <Button color="primary" variant="contained" onClick={onPurchase}>
          {translate('service-detail.purchase')}
        </Button>
      )}
    </div>
  );
};

export default ServiceDetailBox;
