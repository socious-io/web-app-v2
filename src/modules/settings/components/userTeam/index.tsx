import { Divider } from '@mui/material';
import { OrgMeta } from 'src/core/api';
import { translate } from 'src/core/utils';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './userTeam.module.scss';
import { useUserTeam } from './useUserTeam';
import LeaveDeleteMember from '../leaveDeleteMember';
import { LeaveDeleteModalProps } from '../leaveDeleteMember/index.type';

export const UserTeam = () => {
  const { teams, selectedMember, handleLeave, openModal, handleOpenModal, handleCloseModal } = useUserTeam();

  const leaveDeleteMemberProps: LeaveDeleteModalProps =
    selectedMember.count === 1
      ? {
          title: translate('userTeam.leaveModal.lastMemberTitle'),
          subtitle: translate('userTeam.leaveModal.lastMemberSubtitle'),
          content: (
            <div className={css.modalContent}>
              {translate('userTeam.leaveModal.optionsTitle')}
              <ul className="mt-6">
                <li>
                  <b className="font-bold">{translate('userTeam.leaveModal.assignMemberTitle')}</b>
                  {translate('userTeam.leaveModal.assignMemberDescription')}
                </li>
                <li>
                  <b className="font-bold">{translate('userTeam.leaveModal.deleteOrganizationTitle')}</b>
                  {translate('userTeam.leaveModal.deleteOrganizationDescription')}
                </li>
              </ul>
            </div>
          ),
          buttons: [
            {
              children: translate('userTeam.leaveModal.buttons.close'),
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
          ],
        }
      : {
          title: translate('userTeam.leaveModal.defaultTitle'),
          subtitle: translate('userTeam.leaveModal.defaultSubtitle', { teamName: selectedMember.name }),
          buttons: [
            {
              children: translate('userTeam.leaveModal.buttons.cancel'),
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
            {
              children: translate('user-team.leave'),
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
            <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">
              {translate('user-team.team-management-title')}
            </span>
            <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">
              {translate('user-team.team-management-subtitle')}
            </span>
          </div>
          <Divider />
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full md:w-[280px]">
              <span className="text-sm font-semibold text-Gray-light-mode-700">
                {translate('userTeam.onTeams.title')}
              </span>
              <span className="text-sm font-normal text-Gray-light-mode-600">
                {translate('userTeam.onTeams.subtitle')}
                {translate('user-team.on-teams-title')}
              </span>
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
                      {translate('user-team.leave')}
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-4"></div>
        </div>
      </div>
      <LeaveDeleteMember open={openModal} handleClose={handleCloseModal} {...leaveDeleteMemberProps} />
    </>
  );
};
