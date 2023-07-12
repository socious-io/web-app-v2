import { TopFixedMobile } from 'src/components/templates/top-fixed-mobile/top-fixed-mobile';
import { Header } from 'src/components/atoms/header-v2/header';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { AddMemberModal } from '../add-member-modal';
import { SureModal } from 'src/components/templates/sure-modal';
import { printWhen } from 'src/core/utils';
import { useTeamShared } from '../team.shared';
import css from './mobile.module.scss';

export const Mobile: React.FC = () => {
  const {
    updateMembers,
    navigateToMemberProfile,
    onSeeMoreClick,
    openModal,
    setOpenModal,
    onSearchMember,
    memberList,
    onAddMember,
    onRemoveUser,
  } = useTeamShared();

  return (
    <>
      <TopFixedMobile>
        <Header
          title="Team"
          right={
            <div className={css.icon} onClick={() => setOpenModal({ name: 'member', open: true })}>
              <img src="/icons/user-add.svg" />
            </div>
          }
        />
        <>
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
          {printWhen(
            <div onClick={onSeeMoreClick} className={css.seeMore}>
              See more
            </div>,
            updateMembers.total_count > updateMembers.items?.length
          )}
        </>
      </TopFixedMobile>
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
        body={`Do you want to remove "${openModal?.identity?.name}" from your member team?!`}
      />
    </>
  );
};
