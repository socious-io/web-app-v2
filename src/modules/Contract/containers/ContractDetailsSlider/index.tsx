import { ReactNode } from 'react';
import { SemanticContractStatus } from 'src/core/adaptors';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import styles from './index.module.scss';
import { useContractDetailsSlider } from './useContractDetailsSlider';
import SliderAwaiting from '../SliderAwaiting';
import SliderCanceled from '../SliderCanceled';
import SliderCompleted from '../SliderCompleted';
import SliderOfferReceived from '../SliderOfferReceived';
import SliderOfferSent from '../SliderOfferSent';
import SliderOngoing from '../SliderOngoing';
import SliderPaymentRequired from '../SliderPaymentRequired';
import { UserType } from 'src/core/api';

const ContractDetailsSlider = () => {
  const {
    data: {
      partnerName,
      partnerProfileImage,
      partnerType,
      contract,
      tabs,
      disabledMessageButton,
      currentIdentityIsClient,
    },
    operations: { navigateToHomePage, redirectToChat },
  } = useContractDetailsSlider();

  const sliderProps = {
    contract: contract!,
    disableMessage: disabledMessageButton,
    redirectToChat,
  };

  const sliderComponent: Record<SemanticContractStatus, ReactNode> = {
    'Offer sent': <SliderOfferSent {...sliderProps} />,
    'Offer received': <SliderOfferReceived {...sliderProps} />,
    'Awaiting confirmation': <SliderAwaiting {...sliderProps} />,
    'Payment required': <SliderPaymentRequired {...sliderProps} />,
    Ongoing: <SliderOngoing {...sliderProps} />,
    Completed: <SliderCompleted {...sliderProps} />,
    Canceled: (
      <SliderCanceled
        {...sliderProps}
        alertMessage={
          !currentIdentityIsClient
            ? translate('cont-cancel-contract')
            : translate('cont-user-cancel-contract', { name: contract?.partner?.meta?.name || '' })
        }
      />
    ),
    Withdrawn: (
      <SliderCanceled
        {...sliderProps}
        alertMessage={
          currentIdentityIsClient
            ? translate('cont-cancel-contract')
            : translate('cont-user-cancel-contract', { name: contract?.partner?.meta?.name || '' })
        }
      />
    ),
  };

  return (
    <div className={styles['container']}>
      <div className={styles['header']}>
        <Avatar size="72px" type={partnerType as UserType} img={partnerProfileImage} onClick={navigateToHomePage} />
        <div className={styles['header__info']} onClick={navigateToHomePage}>
          {contract?.name && <span className={styles['header__name']}>{contract.name}</span>}
          {partnerName}
        </div>
      </div>
      {sliderComponent[contract?.semanticStatus || '']}
      <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="!gap-0" />
    </div>
  );
};

export default ContractDetailsSlider;
