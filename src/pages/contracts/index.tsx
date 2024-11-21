import { Contract } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import useHideScrollbar from 'src/core/hooks/useHideScrollbar';
import { translate } from 'src/core/utils';
import { useWeb3 } from 'src/dapp/dapp.connect';
import { ContractCard } from 'src/modules/contract/components/contractCard';
import { ContractDetailsSlider } from 'src/modules/contract/components/contractDetailsSlider';
import { ButtonGroups } from 'src/modules/general/components/ButtonGroups';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import { Overlay } from 'src/modules/general/components/slideoutMenu';

import css from './contracts.module.scss';
import { useContracts } from './useContracts';

export const Contracts = () => {
  const { filterButtons, pageCount, contractList, page, openSlider, updatePageNumber, closeSlider, activeFilter } =
    useContracts();
  const isMobile = isTouchDevice();

  isMobile && useHideScrollbar(openSlider);

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.left}>
            <h1 className={css.title}>{translate('cont-title')}</h1>
            <h2 className={css.subtitle}>{translate('cont-subtitle')}</h2>
          </div>
          <div className={css.right}></div>
        </div>

        <ButtonGroups buttons={filterButtons} activeIndex={activeFilter} />
        <div className="flex flex-col gap-6 md:gap-5 w-full max-w-[640px] mt-8">
          {contractList?.map((item: Contract) => <ContractCard key={item.id} contract={item} />)}
        </div>
        <div className="mt-11 hidden md:block">
          <Pagination count={pageCount} page={page} onChange={(e, p) => updatePageNumber(p)} />
        </div>
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={pageCount} handleChange={updatePageNumber} />
        </div>
      </div>
      {openSlider && (
        <Overlay open={openSlider} onClose={closeSlider}>
          <ContractDetailsSlider />
        </Overlay>
      )}
    </>
  );
};
