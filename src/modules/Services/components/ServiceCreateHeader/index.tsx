import { useTranslation } from 'react-i18next';
import { BackLink } from 'src/modules/general/components/BackLink';
import { Button } from 'src/modules/general/components/Button';

import styles from './index.module.scss';
import { ServiceCreateHeaderProps } from './index.types';

const ServiceCreateHeader: React.FC<ServiceCreateHeaderProps> = ({ isEdit = false, onPublish, onCancel, disabled }) => {
  const { t: translate } = useTranslation();

  return (
    <div className={styles['container']}>
      <BackLink title={translate('general-back')} customStyle="w-fit p-0" onBack={onCancel} />
      <div className={styles['header']}>
        <div className={styles['header__title']}>
          <h1>{isEdit ? translate('service-form.header-edit') : translate('service-form.header')}</h1>
          <h2 className={styles['header__subtitle']}>{translate('service-form.subheader')}</h2>
        </div>
        <div className={styles['header__actions']}>
          <Button color="info" variant="outlined" onClick={onCancel}>
            {translate('service-form.cancel.button')}
          </Button>
          <Button color="primary" variant="contained" onClick={onPublish} disabled={disabled}>
            {translate('service-form.publish.button')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreateHeader;
