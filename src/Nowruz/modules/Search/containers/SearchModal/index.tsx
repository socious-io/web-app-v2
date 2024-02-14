import React from 'react';
import variables from 'src/components/_exports.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Icon } from 'src/Nowruz/general/Icon';
import { EmptyState } from 'src/Nowruz/modules/general/components/EmptyState';
import { ResultList } from 'src/Nowruz/modules/Search/components/ResultList';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';

import css from './search-modal.module.scss';
import { SearchModalProps } from './SearchModal.types';
import { useSearchModal } from './useSearchModal';
import { TabPreview } from '../../components/TabBar';
export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, setSearchText }) => {
  const isMobile = window.innerWidth < 600;
  const { tabs, setSelectedTab, fetchSearchResult, list, selectedItem, searchTerm, showNoResult, navigateFullSearch } =
    useSearchModal({
      open,
      onClose,
      setSearchText,
    });
  const width = isMobile ? '100%' : '760px';
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
              placeholder="Search jobs, people, organizations"
            />
          </div>
          <div className={css.content}>
            {!!list?.length && <ResultList list={list} onClose={onClose} />}
            {showNoResult && (
              <EmptyState
                icon={<Icon name="search-lg" fontSize={24} color={variables.color_grey_700} />}
                message="No records found"
              />
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
