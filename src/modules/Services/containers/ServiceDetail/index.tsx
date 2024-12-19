import { translate } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import ServiceDetailBox from 'src/modules/Services/components/ServiceDetailBox';
import ServiceDetailHeader from 'src/modules/Services/components/ServiceDetailHeader';

import styles from './index.module.scss';
import { useServiceDetail } from './useServiceDetail';

const ServiceDetail = () => {
  const {
    data: { service, account, serviceDetail, isOwner, maxLengthDescription },
    operations: { onBack, onServiceActions, onPurchase },
  } = useServiceDetail();

  return (
    <>
      <ServiceDetailHeader
        name={service.name}
        account={account as AccountItem}
        onBack={onBack}
        onActions={onServiceActions}
      />
      <div className={styles['content']}>
        <div className={styles['content__left']}>
          {!!service?.samples?.length && (
            <div className={styles['samples']}>
              {service.samples?.map((sample, index) => (
                <img key={index} src={sample.url} alt="Samples" className={styles['samples__img']} />
              ))}
            </div>
          )}
          {service?.description && (
            <ExpandableText
              seeMoreText={translate('service-detail.more')}
              text={service.description}
              expectedLength={maxLengthDescription}
              isMarkdown
              customStyle={styles['description']}
            />
          )}
        </div>
        <ServiceDetailBox
          customStyle={styles['content__right']}
          serviceDetail={serviceDetail}
          onPurchase={!isOwner ? onPurchase : undefined}
        />
      </div>
    </>
  );
};

export default ServiceDetail;
