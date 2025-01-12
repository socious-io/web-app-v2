import { ReactNode } from 'react';
import { translate } from 'src/core/utils';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ContractDetailTabProps } from './index.types';

const ContractDetailTab: React.FC<ContractDetailTabProps> = ({ contract }) => {
  const renderDetailItems = (iconName: ReactNode, title: string, subtitle?: string) => {
    return (
      <div className={styles['box__item']}>
        {iconName}
        {title}
        {subtitle && <span className={styles['box__item--lighter']}>{subtitle}</span>}
      </div>
    );
  };

  return (
    <div className={styles['container']}>
      <ExpandableText text={contract.description} isMarkdown expectedLength={700} />
      <div className={styles['box']}>
        {/* {renderDetailItems(
          <Icon name="calendar-check-01" fontSize={20} color={variables.color_grey_500} />,
          `Due ${contract.date}`,
        )} */}
        {/* {renderDetailItems(<Icon name="clock" fontSize={20} color={variables.color_grey_500} />, `${contract.total_hours} ${contract.total_hours === 1 ? 'hour' : 'hours'}`)} */}
        {renderDetailItems(
          contract.payment ? (
            contract.payment === 'FIAT' ? (
              <Icon
                name={`currency-${contract.currency.name === 'USD' ? 'dollar' : 'yen'}-circle`}
                fontSize={20}
                color={variables.color_grey_700}
              />
            ) : (
              <img src={`/icons/crypto/${contract.currency.symbol}.svg`} width={20} alt={contract.currency.name} />
            )
          ) : null,
          `${contract.price} ${contract.currency.name}`,
          translate('cont-fixed-price'),
        )}
        {contract.type === 'VOLUNTEER' && (
          <div className={styles['box__volunteer']}>
            <Icon name="heart-filled" fontSize={20} color={variables.color_burgundy_600} />
            {translate('cont-volunteer')}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractDetailTab;
