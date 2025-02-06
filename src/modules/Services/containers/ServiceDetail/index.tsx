import { translate } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import Slider from 'src/modules/general/components/Slider';
import ServiceDetailBox from 'src/modules/Services/components/ServiceDetailBox';
import ServiceDetailHeader from 'src/modules/Services/components/ServiceDetailHeader';
import ServiceOrderDetail from 'src/modules/Services/components/ServiceOrderDetail';

import styles from './index.module.scss';
import { useServiceDetail } from './useServiceDetail';

const ServiceDetail = () => {
  const {
    data: { service, account, serviceDetail, isOwner, maxLengthDescription, openSlider, orderPayment },
    operations: { onBack, onServiceActions, onPurchase, setOpenSlider, onCheckoutService },
  } = useServiceDetail();

  return (
    <>
      <ServiceDetailHeader
        name={service.name}
        account={account as AccountItem}
        isOwner={isOwner}
        onBack={onBack}
        onActions={onServiceActions}
      />
      <div className={styles['content']}>
        <div className={styles['content__left']}>
          {!!service.samples?.length && (
            <div className={styles['samples']}>
              {service.samples.map((sample, index) => (
                <img key={index} src={sample.url} alt="Samples" className={styles['samples__img']} />
              ))}
            </div>
          )}
          <span className={styles['content__title']}>{translate('service-detail.description')}</span>
          <ExpandableText
            seeMoreText={translate('service-detail.more')}
            text={service.description}
            expectedLength={maxLengthDescription}
            isMarkdown
            customStyle={styles['description']}
          />
        </div>
        <ServiceDetailBox
          customStyle={styles['content__right']}
          serviceDetail={serviceDetail}
          // onPurchase={!isOwner ? onPurchase : undefined}
        />
      </div>
      <Slider
        open={openSlider}
        onClose={() => setOpenSlider(false)}
        title={translate('service-detail.order.summary')}
        headerDivider={false}
        titleClassName={styles['slider__title']}
      >
        <ServiceOrderDetail
          service={service}
          orderPayment={orderPayment}
          buttonName={translate('service-detail.order.checkout-button')}
          onButtonClick={onCheckoutService}
        />
      </Slider>
    </>
  );
};

export default ServiceDetail;
