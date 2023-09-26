import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Card } from 'src/components/atoms/card/card';
import { ProfileCard } from 'src/components/templates/profile-card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { AddMemberModal } from '../add-member-modal';
import { SureModal } from 'src/components/templates/sure-modal';
import { printWhen } from 'src/core/utils';
import { useTeamShared } from '../team.shared';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop: React.FC = () => {
  const navigate = {};
  const {
    updateMembers,
    identity,
    navigateToMemberProfile,
    onSeeMoreClick,
    openModal,
    setOpenModal,
    onSearchMember,
    memberList,
    onAddMember,
    onRemoveUser,
  } = useTeamShared();
  const { isLoggedIn } = useAuth();

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Following', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const jobsMenuListOrg = [
    {
      label: 'Created',
      icon: '/icons/folder-black.svg',
      link: () => navigate({ to: `/d/jobs/created/${identity.id}` }),
    },
  ];

  return (
    <>
      <TwoColumnCursor visibleSidebar={isLoggedIn}>
        <div className={css.leftContainer}>
          <ProfileCard />
          <CardMenu title="Network" list={identity.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
          <CardMenu title="Jobs" list={jobsMenuListOrg} />
        </div>
        <div className={css.rightContainer}>
          <Card className={css.card}>
            <div className={css.header}>
              <span />
              Team
              <div className={css.header__icon} onClick={() => setOpenModal({ name: 'member', open: true })}>
                <img src="/icons/user-add.svg" />
              </div>
            </div>
            {!!updateMembers.items.length ? (
              updateMembers.items?.map((member) => {
                const showingName =
                  member.first_name || member.last_name ? `${member.first_name} ${member.last_name}` : member.username;
                return (
                  <div key={member.id} className={css.member}>
                    <div className={css.member__info}>
                      <Avatar
                        type="users"
                        img={member.avatar?.url}
                        onClick={() => navigateToMemberProfile(member.username)}
                      />
                      <div className={css.member__detail}>
                        <span className={css.member__name}>{showingName}</span>
                        <span className={css.member__role}>Member</span>
                      </div>
                    </div>
                    <div
                      onClick={() =>
                        setOpenModal({ name: 'remove', open: true, identity: { id: member.id, name: showingName } })
                      }
                    >
                      <img src="/icons/user-remove.svg" className={css.member__more} />
                    </div>
                  </div>
                );
              })
            ) : (
              <div className={css.noMember}>No Member</div>
            )}
          </Card>
          {printWhen(
            <div onClick={onSeeMoreClick} className={css.seeMore}>
              See more
            </div>,
            updateMembers.total_count > updateMembers.items?.length
          )}
        </div>
      </TwoColumnCursor>
      <AddMemberModal
        open={openModal.name === 'member' && openModal.open}
        onClose={() => setOpenModal({ name: 'member', open: false })}
        memberList={memberList}
        acceptedMembers={updateMembers.items}
        onSearch={onSearchMember}
        onAddMember={onAddMember}
      />
      <SureModal
        open={openModal.name === 'remove' && openModal.open}
        onClose={() => setOpenModal({ ...openModal, open: false })}
        onDone={() => {
          onRemoveUser(openModal?.identity?.id as string);
          setOpenModal({ ...openModal, open: false });
        }}
        modalTexts={{
          title: 'Are you sure?',
          body: `Do you want to remove "${openModal?.identity?.name}" from your member team?!`,
          confirmButton: ' Yes, I’m sure',
          cancleButton: 'Cancel',
        }}
      />
    </>
  );
};
