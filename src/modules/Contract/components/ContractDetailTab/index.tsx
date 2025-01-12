import { ReactNode } from 'react';
import { formatDate } from 'src/core/time';
import { translate } from 'src/core/utils';
import { ExpandableText } from 'src/modules/general/components/expandableText';
import { Icon } from 'src/modules/general/components/Icon';
import variables from 'src/styles/constants/_exports.module.scss';

import styles from './index.module.scss';
import { ContractDetailTabProps } from './index.types';

const ContractDetailTab: React.FC<ContractDetailTabProps> = ({ contract }) => {
  const file = contract.file;
  const fileFormat = file?.filename?.split('.')[1] || '';

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
      <div className={styles['row']}>
        <span className={styles['row__title']}>{translate('cont-description')}</span>
        <ExpandableText text={contract.description} isMarkdown expectedLength={700} />
      </div>
      <div className={styles['box']}>
        {renderDetailItems(
          <Icon name="calendar-check-01" fontSize={20} color={variables.color_grey_500} />,
          `Due ${formatDate(contract.date)}`,
        )}
        {/* FIXME: on contract.type === 'PAID' not price */}
        {contract.price ? (
          renderDetailItems(
            contract.payment === 'FIAT' ? (
              <Icon
                name={`currency-${contract.currency.name === 'USD' ? 'dollar' : 'yen'}-circle`}
                fontSize={20}
                color={variables.color_grey_700}
              />
            ) : (
              <img src={`/icons/crypto/${contract.currency.symbol}.svg`} width={20} alt={contract.currency.name} />
            ),
            `${contract.price} ${contract.currency.name}`,
            translate('cont-fixed-price'),
          )
        ) : (
          <div className={styles['box__volunteer']}>
            <Icon name="heart-filled" fontSize={20} color={variables.color_burgundy_600} />
            {translate('cont-volunteer')}
          </div>
        )}
      </div>
      {contract.requirement && (
        <div className={styles['row']}>
          <span className={styles['row__title']}>{translate('cont-requirements')}</span>
          <ExpandableText text={contract.requirement} isMarkdown expectedLength={700} />
        </div>
      )}
      {file && (
        <div className={styles['file']}>
          <img src={`/icons/file-${fileFormat}.svg`} alt={`${contract.name}-file`} />
          {file?.url && (
            <a href={file.url} download target="_blank" rel="noreferrer">
              {file?.filename || ''}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default ContractDetailTab;
