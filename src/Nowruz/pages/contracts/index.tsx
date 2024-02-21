import { Offer } from 'src/core/api';
import { ContractCard } from 'src/Nowruz/modules/contract/components/contractCard';
import { ContractDetailsSlider } from 'src/Nowruz/modules/contract/components/contractDetailsSlider';
import { ButtonGroups } from 'src/Nowruz/modules/general/components/ButtonGroups';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';

import css from './contracts.module.scss';
import { useContracts } from './useContracts';

export const Contracts = () => {
  const { filterButtons, pageCount, setPage, offerList, page, openOverlayModal, setOpenOverlayModal } = useContracts();

  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.left}>
            <h1 className={css.title}>Contracts</h1>
            <h2 className={css.subtitle}>Manage your jobs offers and work.</h2>
          </div>
          <div className={css.right}></div>
        </div>

        <ButtonGroups buttons={filterButtons} />
        <div className="flex flex-col gap-6 md:gap-5 w-full max-w-[640px] mt-8">
          {offerList?.map((item: Offer) => (
            <ContractCard key={item.id} offer={item} setOpenOverlay={setOpenOverlayModal} />
          ))}
        </div>
        <div className="mt-11 hidden md:block">
          <Pagination count={pageCount} onChange={(e, p) => setPage(p)} />
        </div>
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={pageCount} handleChange={setPage} />
        </div>
      </div>
      <Overlay open={openOverlayModal} onClose={() => setOpenOverlayModal(false)}>
        <ContractDetailsSlider />
      </Overlay>
    </>
  );
};
