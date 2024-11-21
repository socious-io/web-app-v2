import { getIdentityMeta, translate } from 'src/core/utils';
import { AlertModal } from 'src/modules/general/components/AlertModal';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';

import css from './connectionTab.module.scss';
import { useConnectionTab } from './useConnectionTab';
import { ConnectionTabThreeDotsButton } from '../connectionTabThreeDotButton';

export const ConnectionTab = () => {
  const {
    page,
    setPage,
    connectionList,
    currentIdentity,
    redirectToChat,
    handleFollow,
    handleUnfollow,
    handleRemoveConnection,
    handleBlock,
    totalCount,
    PER_PAGE,
    openAlert,
    setOpenAlert,
    handleOpenAlert,
    firstName,
    fullName,
    connectionId,
  } = useConnectionTab();
  return (
    <div className={css.container}>
      {connectionList.map(item => {
        const account = [item.requested, item.requester].find(item => item.meta.id !== currentIdentity?.id);
        const { username, profileImage, type, name } = getIdentityMeta(account);
        const accountItem = {
          id: account?.id || '',
          img: profileImage || '',
          type: type || 'users',
          name: name || '',
          username: (username || '').replace('@', ''),
        };

        return (
          <div key={item.id} className={css.row}>
            <AvatarLabelGroup account={accountItem} />
            <div className={css.action}>
              <Button
                variant="contained"
                color="primary"
                style={{ height: '40px', fontSize: '14px' }}
                onClick={() => redirectToChat(accountItem.id)}
              >
                {translate('connect-message')}
              </Button>
              <ConnectionTabThreeDotsButton
                follower={item.follower}
                following={item.following}
                handleFollow={() => handleFollow(item.id, accountItem.id)}
                handleUnfollow={() => handleUnfollow(item.id, accountItem.id)}
                handleRemoveConnection={() => handleOpenAlert(item.id, accountItem.name, accountItem.name)}
                handleBlock={() => handleBlock(item.id, accountItem.id)}
                name={accountItem.name}
              />
            </div>
          </div>
        );
      })}
      {connectionList.length > 0 && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(totalCount / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {connectionList.length > 0 && (
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={Math.ceil(totalCount / PER_PAGE)} handleChange={setPage} />
        </div>
      )}
      <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title={translate('connect-remove')}
        message={translate('connect-remove-alert', { fullName: fullName, firstName: firstName })}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel={translate('connect-cancel')}
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel={translate('connect-remove-btn')}
        onSubmit={() => handleRemoveConnection(connectionId)}
      />
    </div>
  );
};

export default ConnectionTab;
