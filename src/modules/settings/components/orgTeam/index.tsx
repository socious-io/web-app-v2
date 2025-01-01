import { Divider } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { translate } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { Icon } from 'src/modules/general/components/Icon';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import css from './orgTeam.module.scss';
import { useOrgTeam } from './useOrgTeam';
import LeaveDeleteMember from '../leaveDeleteMember';

export const OrgTeam = () => {
  const {
    addedMembers,
    searchMembers,
    onSelectMember,
    handleAddAnother,
    handleAddMembers,
    teamMembers,
    handleDelete,
    loadMore,
    hasMore,
    selectedMember,
    openModal,
    handleOpenModal,
    handleCloseModal,
  } = useOrgTeam();

  return (
    <>
      <div className="flex flex-col gap-6 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-6 md:flex-row md:gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">
                {translate('orgTeam.teamManagement.title')}
              </span>
              <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">
                {translate('orgTeam.teamManagement.subtitle')}
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-4"></div>
          </div>
          <Divider />
          <div className={css.containerSector}>
            <div className={css.firstCol}>
              <span className={css.colTitle}>{translate('orgTeam.inviteMembers.title')}</span>
              <span className={css.colSubtitle}>{translate('orgTeam.inviteMembers.subtitle')}</span>
            </div>

            <div className={css.secondCol}>
              {addedMembers.map((item, index) => (
                <SearchDropdown
                  key={`${item} ${index}`}
                  id={`member-${index}`}
                  value={addedMembers[index].value ? addedMembers[index] : undefined}
                  placeholder={translate('orgTeam.inviteMembers.placeholder')}
                  isAsync
                  loadOptions={searchMembers}
                  icon="user-01"
                  hasDropdownIcon={true}
                  label=""
                  onChange={value => {
                    onSelectMember(value);
                  }}
                />
              ))}
              <div className="flex justify-between">
                <Button variant="text" color="primary" onClick={handleAddAnother}>
                  <Icon name="plus" fontSize={20} className="text-Gray-light-mode-600" />
                  {translate('orgTeam.inviteMembers.addAnother')}
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMembers}
                  disabled={addedMembers.filter(item => item).length === 0}
                >
                  {translate('orgTeam.inviteMembers.addMember')}
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className={css.containerSector}>
            <div className={css.firstCol}>
              <span className={css.colTitle}>{translate('orgTeam.teamMembers.title')}</span>
              <span className={css.colSubtitle}>{translate('orgTeam.teamMembers.subtitle')}</span>
            </div>

            <div className={css.secondCol}>
              <InfiniteScroll
                initialLoad={false}
                threshold={150}
                useWindow={true}
                pageStart={1}
                loadMore={loadMore}
                hasMore={hasMore}
                className="flex-1"
              >
                {!!teamMembers.length && (
                  <div className={css.table}>
                    <div className={css.header}>{translate('orgTeam.teamMembers.nameHeader')}</div>

                    {teamMembers.map(item => (
                      <div key={item.id} className={css.row}>
                        <AvatarLabelGroup account={item} customStyle="!p-0" />
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => handleOpenModal(item.id, item.name)}
                          disabled={teamMembers.length === 1}
                          customStyle="!p-0 !min-w-fit !w-fit !text-sm "
                        >
                          {translate('orgTeam.teamMembers.delete')}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
      <LeaveDeleteMember
        open={openModal}
        handleClose={handleCloseModal}
        title={translate('orgTeam.leaveDeleteModal.title')}
        subtitle={translate('orgTeam.leaveDeleteModal.subtitle', { memberName: selectedMember.name })}
        buttons={[
          {
            children: translate('orgTeam.leaveDeleteModal.buttons.cancel'),
            color: 'secondary',
            variant: 'outlined',
            onClick: handleCloseModal,
          },
          {
            children: translate('orgTeam.leaveDeleteModal.buttons.delete'),
            color: 'error',
            onClick: () => handleDelete(selectedMember.id),
          },
        ]}
      />
    </>
  );
};
