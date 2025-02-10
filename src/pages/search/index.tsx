import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import Slider from 'src/modules/general/components/Slider';
import { FilterSlider } from 'src/modules/Search/components/FilterSlider';
import { useSearch } from 'src/pages/search/useSearch';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './list.module.scss';

export const Search = () => {
  const {
    data: {
      page,
      searchResult,
      total,
      PER_PAGE,
      readableType,
      q,
      sliderFilterOpen,
      filter,
      countryName,
      scrollRef,
      scrollIndex,
    },
    operations: { setPage, card, handleCloseOrApplyFilter, onApply, onClose, handleChangeMobilePage },
  } = useSearch();

  const headerClass = `${css.header}`;
  return (
    <div className={css.container}>
      <div className={css.headerContainer}>
        <div className={headerClass}>
          <h1 className={css.title}>{translate('search.title', { query: q })}</h1>
          <h2 className={css.subtitle}>
            {translate('search.subtitle', {
              total,
              type: readableType.title,
              country: countryName ? `in ${countryName}` : '',
            })}
          </h2>
        </div>
        <div>
          <Button color="secondary" variant="outlined" className={css.filterButton} onClick={handleCloseOrApplyFilter}>
            <Icon fontSize={20} name="filter-lines" color={variables.color_grey_700} />
            {translate('search.filters')}
          </Button>
        </div>
      </div>
      <div className={css.list}>
        {searchResult.items?.map((item, index) => (
          <div key={item.id} className="mt-6" ref={index === scrollIndex ? scrollRef : null}>
            {card(item, index)}
          </div>
        ))}

        <div className="mt-11 hidden md:block">
          {total >= PER_PAGE && (
            <Pagination page={page} count={Math.ceil(total / PER_PAGE)} onChange={(e, p) => setPage(p)} />
          )}
        </div>

        {(searchResult.items?.length ?? 0) < total && (
          <div className="mt-5 flex items-center justify-center md:hidden">
            <Button color="primary" variant="text" onClick={handleChangeMobilePage}>
              {translate('search.seeMore')}
            </Button>
          </div>
        )}
      </div>
      <Slider
        open={sliderFilterOpen}
        onClose={handleCloseOrApplyFilter}
        title={translate('search.filterTitle')}
        subtitle={
          readableType.title === 'services'
            ? translate('search.filterSubtitleService')
            : translate('search.filterSubtitle', { type: readableType.title })
        }
      >
        <FilterSlider type={readableType.type} onApply={onApply} onClose={onClose} filter={filter} />
      </Slider>
    </div>
  );
};
