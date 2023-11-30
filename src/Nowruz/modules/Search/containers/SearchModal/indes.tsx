import React from 'react';
import { Modal } from 'src/components/templates/modal/modal';

import css from './search-modal.module.scss';
import { useSearchModal } from './useSearchModal';
import { ResultList } from '../../components/ResultList';
import { SearchInput } from '../../components/SearchInput';
import { TabPreview } from '../../components/TabPreview';
export const SearchModal = () => {
  const { tabs, setSelectedTab, fetchSearchResult } = useSearchModal();
  return (
    <Modal
      width="640px"
      height="396px"
      zIndex={4}
      onClose={() => {
        console.log();
      }}
      open={true}
    >
      <div>
        <div className={css.tabsRow}>
          <TabPreview tabs={tabs} onSelect={(tab) => setSelectedTab(tab.value)} defaultTabIndex={0} />
        </div>
        <div className={css.searchInput}>
          <SearchInput onChange={fetchSearchResult} placeholder="Search jobs, people, organizations" />
        </div>
        <ResultList />
      </div>
    </Modal>
  );
};
