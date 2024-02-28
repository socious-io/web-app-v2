import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { Overlay } from 'src/Nowruz/modules/general/components/slideoutMenu';
import { FilterSlider } from 'src/Nowruz/modules/Search/components/FilterSlider';
import { useSearch } from 'src/Nowruz/pages/search/useSearch';

import css from './list.module.scss';

export const Search = () => {
  const {
    data: { page, searchResult, total, PER_PAGE, readableType, q, sliderFilterOpen, filter, countryName },
    operations: { setPage, card, handleCloseOrApplyFilter, onApply, onClose },
  } = useSearch();

  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div className={headerClass}>
          <h1 className={css.title}>{`Search for ${q}`}</h1>
          <h2 className={css.subtitle}>{`${total} ${readableType} found ${countryName ? `in ${countryName}` : ``}`}</h2>
        </div>
        <div>
          <Button color="secondary" variant="outlined" className={css.filterButton} onClick={handleCloseOrApplyFilter}>
            <Icon fontSize={20} name="filter-lines" color={variables.color_grey_700} />
            Filters
          </Button>
        </div>
      </div>
      <div className={css.list}>
        {searchResult.items?.map((item) => <div className="mt-6">{card(item)}</div>)}

        <div className="mt-11 hidden md:block">
          {total >= PER_PAGE && <Pagination count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />}
        </div>

        <div className="mt-5 flex items-center justify-center block md:hidden">
          <Button color="primary" variant="text" onClick={() => setPage(page + 1)}>
            See more
          </Button>
        </div>
      </div>
      <Overlay
        open={sliderFilterOpen}
        onClose={handleCloseOrApplyFilter}
        title="Filter by"
        subtitle={`Filter ${readableType} by social causes, skills and more`}
      >
        <FilterSlider type={readableType} onApply={onApply} onClose={onClose} filter={filter} />
      </Overlay>
    </div>
  );
};
