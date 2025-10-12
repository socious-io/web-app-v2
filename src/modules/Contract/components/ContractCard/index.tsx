import { CONTRACT_STATUS } from 'src/constants/CONTRACTS_STATUS';
import { toRelativeTime } from 'src/core/relative-time';
import { translate } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Icon } from 'src/modules/general/components/Icon';
import Status from 'src/modules/general/components/Status';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ContractCardProps } from './index.types';
import { useContractCard } from './useContractCard';
import { UserType } from 'src/core/api';

const ContractCard: React.FC<ContractCardProps> = ({ contract }) => {
  const {
    data: { partnerName, partnerProfileImage, partnerType },
    operations: { handleOpenOverlayModal },
  } = useContractCard(contract);

  return (
    <div className={styles['container']} onClick={handleOpenOverlayModal}>
      <div className={styles['info']}>
        <Avatar size="56px" type={partnerType as UserType} img={partnerProfileImage} />
        <div className={styles['info__name']}>
          {contract.name}
          <span className={styles['info__date']}>{`${partnerName}・${toRelativeTime(contract.date)}`}</span>
        </div>
      </div>
      <div className={styles['bottom']}>
        {/* FIXME: on contract.type === 'PAID' not price */}
        {contract.price ? (
          <div className={styles['bottom__price']}>
            {contract.payment === 'FIAT' ? (
              <Icon
                name={`currency-${contract.currency.name === 'USD' ? 'dollar' : 'yen'}-circle`}
                fontSize={20}
                color={variables.color_grey_700}
              />
            ) : (
              <img src={`/icons/crypto/${contract.currency.symbol}.svg`} width={20} alt={contract.currency.name} />
            )}
            {contract.price} {''}
            {contract.currency.name}
            <span className={styles['bottom__fixed']}>{translate('cont-fixed-price')}</span>
          </div>
        ) : (
          <div className={styles['bottom__volunteer']}>
            <Icon name="heart-filled" fontSize={20} color={variables.color_burgundy_600} />
            {translate('cont-volunteer')}
          </div>
        )}
        {contract?.semanticStatus && (
          <Status
            label={translate(`cont-status.${contract.semanticStatus}`)}
            transparent
            {...CONTRACT_STATUS[contract.semanticStatus]}
          />
        )}
      </div>
    </div>
  );
};

export default ContractCard;
