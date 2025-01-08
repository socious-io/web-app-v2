import { Contract } from 'src/core/adaptors';
import useHideScrollbar from 'src/core/hooks/useHideScrollbar';
import { translate } from 'src/core/utils';
import ContractCard from 'src/modules/Contract/components/ContractCard';
import ContractDetailsSlider from 'src/modules/Contract/containers/ContractDetailsSlider';
import { ButtonGroups } from 'src/modules/general/components/ButtonGroups';
import { ButtonGroupItem } from 'src/modules/general/components/ButtonGroups/buttonGroups.types';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import Slider from 'src/modules/general/components/Slider';

import styles from './index.module.scss';
import { useContracts } from './useContracts';

export const Contracts = () => {
  const {
    data: { activeFilter, contractList, pageCount, page, openSlider },
    operations: { handleChangeFilter, updatePageNumber, closeSlider },
  } = useContracts();
  useHideScrollbar(openSlider, true);

  const filterButtons: ButtonGroupItem[] = [
    { label: translate('cont-filter-all'), handleClick: () => handleChangeFilter('all') },
    { label: translate('cont-filter-ongoing'), handleClick: () => handleChangeFilter('ongoing') },
    { label: translate('cont-filter-archived'), handleClick: () => handleChangeFilter('archived') },
  ];

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['header']}>
          <h1 className={styles['title']}>{translate('cont-title')}</h1>
          <h2 className={styles['subtitle']}>{translate('cont-subtitle')}</h2>
        </div>
        <ButtonGroups buttons={filterButtons} activeIndex={activeFilter} />
        <div className={styles['list']}>
          {contractList?.map((item: Contract) => <ContractCard key={item.id} contract={item} />)}
        </div>
        <div className="mt-11 hidden md:block">
          <Pagination count={pageCount} page={page} onChange={(_, p) => updatePageNumber(p)} />
        </div>
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={pageCount} handleChange={updatePageNumber} />
        </div>
      </div>
      {openSlider && (
        <Slider open={openSlider} onClose={closeSlider}>
          <ContractDetailsSlider />
        </Slider>
      )}
    </>
  );
};
