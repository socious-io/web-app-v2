import { Divider } from '@mui/material';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { OrgMeta } from 'src/core/api';
import variables from 'src/components/_exports.module.scss';
import { useUserTeam } from './useUserTeam';

export const UserTeam = () => {
  const { teams, handleLeave } = useUserTeam();
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
              {teams.map((item) => {
                const meta = item.meta as OrgMeta;
                const account = {
                  id: item.id,
                  img: meta.image || '',
                  type: 'organizations',
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
                      onClick={() => handleLeave(item.id)}
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
    </>
  );
};
