import { Divider } from '@mui/material';
import variables from 'src/components/_exports.module.scss';
import { OrgMeta } from 'src/core/api';
import { AccountItem } from 'src/Nowruz/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';

import css from './userTeam.module.scss';
import { useUserTeam } from './useUserTeam';
import LeaveDeleteMember from '../leaveDeleteMember';
import { LeaveDeleteModalProps } from '../leaveDeleteMember/index.type';

export const UserTeam = () => {
  const { teams, selectedMember, handleLeave, openModal, handleOpenModal, handleCloseModal } = useUserTeam();

  const leaveDeleteMemberProps: LeaveDeleteModalProps =
    selectedMember.count === 1
      ? {
          title: 'Leave team?',
          subtitle: `You currently are the last member of this team. Unfortunatly, this means you can't leave the team until you add another member.`,
          content: (
            <div className={css.modalContent}>
              Here are your options:
              <ul className="mt-6">
                <li>
                  <b className="font-bold">Assign member: </b>
                  Choose another team member you trust and grant them rights. This will allow you to leave the team
                  while ensuring someone remains to manage it.
                </li>
                <li>
                  <b className="font-bold">Delete the organization: </b>
                  If the organization is no longer needed, you can choose to delete it entirely.
                </li>
              </ul>
            </div>
          ),
          buttons: [
            {
              children: 'Close',
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
          ],
        }
      : {
          title: 'Leave team?',
          subtitle: `Are you sure you want to leave ${selectedMember.name}?`,
          buttons: [
            {
              children: 'Cancel',
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
            {
              children: 'Leave',
              color: 'error',
              onClick: () => handleLeave(selectedMember.id),
            },
          ],
        };

  return (
    <>
      <div className="w-full flex flex-col gap-6 ">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">Team management</span>
            <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">Manage your teams</span>
          </div>
          <Divider />
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full md:w-[280px]">
              <span className="text-sm font-semibold text-Gray-light-mode-700">On teams</span>
              <span className="text-sm font-normal text-Gray-light-mode-600">You’re currently on these teams.</span>
            </div>
            <div className="flex-1 flex flex-col">
              {teams.map(item => {
                const meta = item.meta as OrgMeta;
                const account = {
                  id: item.id,
                  img: meta.image || '',
                  type: 'organizations' as AccountItem['type'],
                  name: meta.name,
                  username: meta.shortname,
                };
                return (
                  <div
                    key={item.id}
                    className="w-full flex justify-between py-4 border border-solid border-Gray-light-mode-200 border-t-0 border-x-0"
                  >
                    <AvatarLabelGroup account={account} customStyle="!p-0" />
                    <Button
                      variant="text"
                      color="secondary"
                      style={{ color: variables.color_grey_600 }}
                      onClick={() => handleOpenModal(item.id, meta.name)}
                    >
                      Leave
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4"></div>
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
      <LeaveDeleteMember open={openModal} handleClose={handleCloseModal} {...leaveDeleteMemberProps} />
    </>
  );
};
