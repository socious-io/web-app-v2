import { Divider } from '@mui/material';
import { OrgMeta } from 'src/core/api';
import { AccountItem } from 'src/modules/general/components/avatarDropDown/avatarDropDown.types';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import variables from 'src/styles/constants/_exports.module.scss';
import { useTranslation } from 'react-i18next';


import css from './userTeam.module.scss';
import { useUserTeam } from './useUserTeam';
import LeaveDeleteMember from '../leaveDeleteMember';
import { LeaveDeleteModalProps } from '../leaveDeleteMember/index.type';

export const UserTeam = () => {
  const { t } = useTranslation('settings');

  const { teams, selectedMember, handleLeave, openModal, handleOpenModal, handleCloseModal } = useUserTeam();

  const leaveDeleteMemberProps: LeaveDeleteModalProps =
    selectedMember.count === 1
      ? {
          title: t('leave_team_prompt'),
          subtitle: `You currently are the last member of this team. Unfortunatly, this means you can't leave the team until you add another member.`,
          content: (
            <div className={css.modalContent}>
              {t('sup_options')}
              <ul className="mt-6">
                <li>
                  <b className="font-bold">{t('sup_assign_mem')}</b>
                  {t('sup_assignment_exe')}
                </li>
                <li>
                  <b className="font-bold">{t('sup_deletion_header')}</b>
                  {t('sup_deletion_option')}
                </li>
              </ul>
            </div>
          ),
          buttons: [
            {
              children: t('close'),
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
          ],
        }
      : {
          title: t('leave_team_prompt'),
          subtitle: `Are you sure you want to leave ${selectedMember.name}?`,
          buttons: [
            {
              children: t('cancel'),
              color: 'secondary',
              variant: 'outlined',
              onClick: handleCloseModal,
            },
            {
              children: t('leave'),
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
            <span className="text-lg font-semibold leading-7 text-Gray-light-mode-900">{t('team_management')}</span>
            <span className="text-sm font-normal leading-5 text-Gray-light-mode-600">{t('manage_teams')}</span>
          </div>
          <Divider />
          <div className="w-full flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="flex flex-col w-full md:w-[280px]">
              <span className="text-sm font-semibold text-Gray-light-mode-700">{t('on_teams')}</span>
              <span className="text-sm font-normal text-Gray-light-mode-600">{t('supporting_text_on_teams')}</span>
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
                      {t('leave')}
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
