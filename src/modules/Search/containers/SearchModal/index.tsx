import React, { useEffect, useRef } from 'react';
import { translate } from 'src/core/utils'; // Updated for translations
import { Icon } from 'src/modules/general/components/Icon';
import { ResultList } from 'src/modules/Search/components/ResultList';
import { SearchInput } from 'src/modules/Search/components/SearchInput';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './search-modal.module.scss';
import { SearchModalProps, TabValue } from './SearchModal.types';
import { useSearchModal } from './useSearchModal';
import { Modal } from '../../components/Modal/modal';
import { ResultNotFound } from '../../components/ResultNotFound';
import { TabPreview } from '../../components/TabBar';

export const SearchModal: React.FC<SearchModalProps> = ({ open, onClose, setSearchText }) => {
  const isMobile = window.innerWidth < 600;
  const {
    tabs,
    setSelectedTab,
    handleInputChange,
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

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef?.current.focus;
    }
  }, [open]);

  return (
    <Modal
      width={width}
      zIndex={51}
      onClose={() => {
        onClose();
      }}
      className={css.modal}
      open={open}
    >
      <>
        <div className={css.mobileHeader}>
          <span>{translate('search-modal.mobile-header')}</span>
          <Icon name="x-close" fontSize={24} color={variables.color_grey_700} onClick={onClose} />
        </div>
        <div className={css.container}>
          <div className={css.tabsRow}>
            <TabPreview tabs={tabs} onSelect={tab => setSelectedTab(tab.value as TabValue)} defaultTabIndex={0} />
          </div>
          <div className={css.searchInput}>
            <SearchInput
              value={searchTerm}
              onChange={handleInputChange}
              onEnter={navigateFullSearch}
              onEscape={onClose}
              placeholder={translate('search-modal.placeholder')}
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
                {translate('search-modal.see-all-results')}
              </div>
            </div>
          )}
        </div>
      </>
    </Modal>
  );
};
