import React, { useEffect, useRef } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Icon } from 'src/Nowruz/general/Icon';
import { ResultList } from 'src/Nowruz/modules/Search/components/ResultList';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';

import css from './search-modal.module.scss';
import { SearchModalProps } from './SearchModal.types';
import { useSearchModal } from './useSearchModal';
import { ResultNotFound } from '../../components/ResultNotFound';
import { TabPreview } from '../../components/TabBar';

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, setSearchText }) => {
  const isMobile = window.innerWidth < 600;
  const {
    tabs,
    setSelectedTab,
    fetchSearchResult,
    list,
    selectedItem,
    searchTerm,
    showNoResult,
    navigateFullSearch,
    selectedTab,
  } = useSearchModal({
    open,
    onClose,
    setSearchText,
  });
  const width = isMobile ? '100%' : '760px';

  const inputRef = useRef(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef?.current.focus;
    }
  }, [open]);

  return (
    <Modal
      width={width}
      // height="516px"
      zIndex={51}
      onClose={() => {
        onClose();
      }}
      className={css.modal}
      open={open}
    >
      <>
        <div className={css.mobileHeader}>
          <span>Search</span>
          <Icon name="x-close" fontSize={24} color={variables.color_grey_700} onClick={onClose} />
        </div>
        <div className={css.container}>
          <div className={css.tabsRow}>
            <TabPreview tabs={tabs} onSelect={(tab) => setSelectedTab(tab.value)} defaultTabIndex={0} />
          </div>
          <div className={css.searchInput}>
            <SearchInput
              value={searchTerm}
              onChange={fetchSearchResult}
              onEnter={navigateFullSearch}
              onEscape={onClose}
              placeholder="Search jobs, people, organizations"
              open={open}
            />
          </div>
          <div className={css.content}>
            {!!list?.length && <ResultList list={list} onClose={onClose} />}
            {showNoResult && !list?.length && (
              <ResultNotFound type={selectedTab} searchTerm={searchTerm} onClose={onClose} />
            )}
          </div>
          {!!list?.length && (
            <div className={`${css.footer} ${selectedItem ? css.footerSelecteItem : ''}`}>
              <div className={css.showResults} onClick={navigateFullSearch}>
                See all results
              </div>
            </div>
          )}
        </div>
      </>
    </Modal>
  );
};
