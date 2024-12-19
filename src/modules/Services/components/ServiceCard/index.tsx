import { CURRENCY_SIGNS } from 'src/constants/PAYMENT_CURRENCY';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceCardProps } from './index.types';

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  sample = '',
  name,
  category,
  skills,
  delivery,
  price,
  currency,
  myProfile,
  onCardClick,
  onActions,
}) => {
  const actionsJSX = (
    <>
      <Button
        variant="text"
        color="secondary"
        customStyle={styles['button']}
        onClick={e => {
          e.stopPropagation();
          onActions('duplicate', id);
        }}
      >
        {translate('service-card.duplicate')}
      </Button>
      <Button
        variant="text"
        color="secondary"
        customStyle={styles['button']}
        onClick={e => {
          e.stopPropagation();
          onActions('delete', id);
        }}
      >
        {translate('service-card.delete')}
      </Button>
      <Button
        variant="text"
        color="secondary"
        customStyle={styles['button']}
        onClick={e => {
          e.stopPropagation();
          onActions('edit', id);
        }}
      >
        {translate('service-card.edit')}
      </Button>
    </>
  );

  return (
    <div className={styles['container']} onClick={() => onCardClick(id)}>
      {sample && <img src={sample} alt="work-sample" className={styles['image']} />}
      <div className={`${styles['content']} ${!sample && styles['content--full']}`}>
        <div className={styles['content__row']}>
          <div className={styles['content__header']}>
            {category}
            <span className={styles['content__name']}>{name}</span>
          </div>
          {myProfile && <div className={`${styles['content__actions']} hidden md:flex`}>{actionsJSX}</div>}
        </div>
        <div className={styles['content__skills']}>
          {skills.map(item => (
            <Chip key={item} label={item} theme="grey_blue" size="md" customStyle={styles['skill']} />
          ))}
        </div>
        <div className={styles['content__row']}>
          <div className={styles['content__delivery']}>
            <Icon name="hourglass-03" fontSize={20} color={variables.color_grey_700} />
            {delivery} {translate('service-card.delivery')}
          </div>
          <span className={styles['content__price']}>
            {CURRENCY_SIGNS[currency] || ''}
            {price} {currency}
          </span>
        </div>
      </div>
      {myProfile && <div className={`${styles['content__actions']} flex md:hidden`}>{actionsJSX}</div>}
    </div>
  );
};

export default ServiceCard;
