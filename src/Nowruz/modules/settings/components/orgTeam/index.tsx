import { Divider } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroller';
import { Icon } from 'src/Nowruz/general/Icon';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { SearchDropdown } from 'src/Nowruz/modules/general/components/SearchDropdown';

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
              <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Team management</span>
              <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">
                Manage your team members and their account permissions here.
              </span>
            </div>
            <div className="flex flex-col flex-1 gap-4"></div>
          </div>
          <Divider />
          <div className={css.containerSector}>
            <div className={css.firstCol}>
              <span className={css.colTitle}>Invite team members</span>
              <span className={css.colSubtitle}>Invite member to post or manage your organization</span>
            </div>

            <div className={css.secondCol}>
              {addedMembers.map((item, index) => (
                <SearchDropdown
                  key={`${item} ${index}`}
                  id={`member-${index}`}
                  value={addedMembers[index].value ? addedMembers[index] : undefined}
                  placeholder="Select team member"
                  cacheOptions
                  isAsync
                  loadOptions={searchMembers}
                  defaultOptions
                  // className="my-5"
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
                  Add another
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddMembers}
                  disabled={addedMembers.filter(item => item).length === 0}
                >
                  Add member
                </Button>
              </div>
            </div>
          </div>
          <Divider />
          <div className={css.containerSector}>
            <div className={css.firstCol}>
              <span className={css.colTitle}>Team members</span>
              <span className={css.colSubtitle}>Manage your existing team and change roles/permissions.</span>
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
                    <div className={css.header}>Name</div>

                    {teamMembers.map(item => (
                      <div key={item.id} className={css.row}>
                        <AvatarLabelGroup account={item} customStyle="!p-0" />
                        <Button
                          variant="text"
                          color="secondary"
                          onClick={() => handleOpenModal(item.id, item.name)}
                          disabled={teamMembers.length === 1}
                        >
                          Delete
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
      {/* <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Delete member"
        message={`Are you sure you want to delete ${toDeleteName}?`}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel="Delete"
        onSubmit={handleDelete}
      /> */}
      <LeaveDeleteMember
        open={openModal}
        handleClose={handleCloseModal}
        title="Delete member?"
        subtitle={`Are you sure you want to delete ${selectedMember.name}? They will not be able to manage your organization anymore.`}
        buttons={[
          {
            children: 'Cancel',
            color: 'secondary',
            variant: 'outlined',
            onClick: handleCloseModal,
          },
          {
            children: 'Delete',
            color: 'error',
            onClick: () => handleDelete(selectedMember.id),
          },
        ]}
      />
    </>
  );
};
