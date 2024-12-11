import { translate } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { BackLink } from 'src/modules/general/components/BackLink';
import { Button } from 'src/modules/general/components/Button';
// import { Icon } from 'src/modules/general/components/Icon';
// import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ServiceDetailHeaderProps } from './index.types';

const ServiceDetailHeader: React.FC<ServiceDetailHeaderProps> = ({ name, account, onBack, onActions }) => {
  return (
    <div className={styles['container']}>
      <BackLink title={translate('service-detail.header')} customStyle="w-fit p-0" onBack={onBack} />
      <div className={styles['content']}>
        <div className={styles['content__info']}>
          {name}
          <AvatarLabelGroup account={account} customStyle="!p-0" />
        </div>
        <div className={styles['content__actions']}>
          {/* <Button
            color="secondary"
            variant="outlined"
            startIcon={<Icon name="share-01" fontSize={20} color={variables.color_grey_700} />}
            onClick={() => onActions('share')}
            customStyle="w-full"
          >
            {translate('service-detail.share')}
          </Button> */}
          <Button color="secondary" variant="outlined" onClick={() => onActions('edit')} customStyle="w-full">
            {translate('service-detail.edit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailHeader;
