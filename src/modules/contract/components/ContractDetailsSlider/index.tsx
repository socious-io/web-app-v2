import { ReactNode } from 'react';
import { SemanticContractStatus } from 'src/core/adaptors';
import { UserType } from 'src/core/types';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { HorizontalTabs } from 'src/modules/general/components/horizontalTabs';

import styles from './index.module.scss';
import { useContractDetailsSlider } from './useContractDetailsSlider';
import SliderOfferReceived from '../SliderOfferReceived';
import SliderOfferSent from '../SliderOfferSent';

const ContractDetailsSlider = () => {
  const {
    data: { partnerName, partnerProfileImage, partnerType, contract, tabs, disabledMessageButton },
    operations: { navigateToHomePage, redirectToChat },
  } = useContractDetailsSlider();

  const sliderComponent: Record<SemanticContractStatus, ReactNode> = {
    'Offer sent': (
      <SliderOfferSent contract={contract!} disableMessage={disabledMessageButton} redirectToChat={redirectToChat} />
    ),
    'Offer received': (
      <SliderOfferReceived
        contract={contract!}
        disableMessage={disabledMessageButton}
        redirectToChat={redirectToChat}
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
      <HorizontalTabs tabs={tabs} leftAligned={false} containerCustomStyle="gap-0" />
    </div>
  );
};

export default ContractDetailsSlider;
