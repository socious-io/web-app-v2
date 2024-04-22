import { getIdentityMeta } from 'src/core/utils';
import { AlertModal } from 'src/Nowruz/modules/general/components/AlertModal';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './followingTab.module.scss';
import { useFollowerTab } from './useFollowerTab';

export const FollowerTab = () => {
  const {
    followerList,
    page,
    setPage,
    totalCount,
    PER_PAGE,
    handleClick,
    openAlert,
    setOpenAlert,
    name,
    handleUnfollow,
  } = useFollowerTab();

  return (
    <div className={css.container}>
      {followerList.map((item) => {
        const { username, profileImage, type, name } = getIdentityMeta(item.identity_meta);
        const accountItem = {
          id: item.identity_meta?.id || '',
          img: profileImage || '',
          type: type || 'users',
          name: name || '',
          username: (username || '').replace('@', ''),
        };

        return (
          <div key={item.id} className={css.row}>
            <AvatarLabelGroup account={accountItem} />

            <Button
              variant="outlined"
              color="primary"
              style={{ height: '40px', fontSize: '14px' }}
              customStyle={item.following ? '' : css.followBtn}
              onClick={() => handleClick(item.id)}
            >
              {item.mutual ? 'Following' : 'Follow'}
            </Button>
          </div>
        );
      })}
      {followerList.length > 0 && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(totalCount / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {followerList.length > 0 && (
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={Math.ceil(totalCount / PER_PAGE)} handleChange={setPage} />
        </div>
      )}
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Unfollow"
        message={`Are you sure you want to unfollow ${name}?`}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel="Unfollow"
        onSubmit={handleUnfollow}
      />
    </div>
  );
};
