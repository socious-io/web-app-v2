import { useTranslation } from 'react-i18next';
import { Button } from 'src/modules/general/components/Button';
import { Chip } from 'src/modules/general/components/Chip';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceCardProps } from './index.types';

const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  image = '',
  name,
  category,
  skills,
  delivery,
  price,
  currency,
  onCardClick,
  onActions,
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className={styles['container']} onClick={() => onCardClick(id)}>
      <div className={styles['container__right']}>
        {image && (
          <div className={styles['image']}>
            <img src={image} alt="work-sample" width={100} height={100} />
          </div>
        )}
        <div className={styles['info']}>
          {category}
          <div className={styles['info__bottom']}>
            <span className={styles['info__name']}>{name}</span>
            <div className={styles['info__skills']}>
              {skills.map(item => (
                <Chip key={item} label={item} theme="grey_blue" />
              ))}
            </div>
            <div className={styles['info__delivery']}>
              <Icon name="hourglass-03" fontSize={20} color={variables.color_grey_700} />
              {delivery} {translate('service-card.delivery')}
            </div>
          </div>
        </div>
      </div>
      <div className={styles['container__left']}>
        <div className={styles['actions']}>
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
        </div>
        <span className={styles['price']}>
          {price} {currency}
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
