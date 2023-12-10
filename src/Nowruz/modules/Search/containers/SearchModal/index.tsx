import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Icon } from 'src/Nowruz/general/Icon';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { ResultList } from 'src/Nowruz/modules/Search/components/ResultList';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';
import { TabPreview } from 'src/Nowruz/modules/Search/components/TabPreview';
import { UserCard } from 'src/Nowruz/modules/Search/components/UserCard';

import css from './search-modal.module.scss';
import { SearchModalProps } from './SearchModal.types';
import { useSearchModal } from './useSearchModal';
import { ResultNotFound } from '../../components/ResultNotFound';
export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose }) => {
  const isMobile = window.innerWidth < 600;
  const {
    tabs,
    setSelectedTab,
    fetchSearchResult,
    list,
    setSelectedItem,
    selectedItem,
    searchTerm,
    selectedTab,
    showNoResult,
  } = useSearchModal({
    open,
    onClose,
  });
  const width = isMobile ? '100%' : '760px';
  return (
    <Modal
      width={width}
      // height="516px"
      zIndex={4}
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
        <div className={css.container} onClick={() => console.log('clicked')}>
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
            <ResultList list={list} onSelect={(item) => setSelectedItem(item)} />
            {selectedItem && !isMobile && <UserCard user={selectedItem} />}
            {showNoResult && <ResultNotFound searchTerm={searchTerm} type={selectedTab} />}
          </div>
          {!!list.length && (
            <div className={`${css.footer} ${selectedItem ? css.footerSelecteItem : ''}`}>
              <div className={css.showResults}>See all results</div>
              {/*
            // keyboard footer maybe back later
            to close
            <div className={`${css.footerButton} mr-2 ml-4`}>esc </div>
            to select
            <div className={`${css.footerButton} mr-2 ml-4`}>
              <Icon name="corner-down-left" fontSize={16} color={variables.color_grey_500} />
            </div>
            to navigate
            <div className={`${css.footerButton} mx-2`}>
              <Icon name="arrow-down" fontSize={16} color={variables.color_grey_500} />
            </div>
            <div className={css.footerButton}>
              <Icon name="arrow-up" fontSize={16} color={variables.color_grey_500} />
            </div> */}
            </div>
          )}
        </div>
      </>
    </Modal>
  );
};
