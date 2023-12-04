import React, { useState } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Icon } from 'src/Nowruz/general/Icon';
import { ResultList } from 'src/Nowruz/modules/Search/components/ResultList';
import { SearchInput } from 'src/Nowruz/modules/Search/components/SearchInput';
import { TabPreview } from 'src/Nowruz/modules/Search/components/TabPreview';
import { UserCard } from 'src/Nowruz/modules/Search/components/UserCard';

import css from './search-modal.module.scss';
import { useSearchModal } from './useSearchModal';
export const SearchModal = ({ open, onClose }) => {
  const isMobile = window.innerWidth < 600;
  console.log('ismobile', isMobile);
  const { tabs, setSelectedTab, fetchSearchResult, list, setSelectedItem, selectedItem, searchTerm } = useSearchModal({
    open,
    onClose,
  });
  const width = isMobile ? '100%' : '760px';
  console.log('item selected ', selectedItem);
  return (
    <Modal
      width={width}
      // height="516px"
      zIndex={4}
      onClose={() => {
        console.log();
      }}
      className={css.modal}
      open={true}
    >
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
          <ResultList list={list} onSelect={(item) => setSelectedItem(item)} />
          {selectedItem && !isMobile && <UserCard user={selectedItem} />}
        </div>
        <div className={css.footer}>
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
          </div>
        </div>
      </div>
    </Modal>
  );
};
