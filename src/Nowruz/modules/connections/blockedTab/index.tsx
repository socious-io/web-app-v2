import { getIdentityMeta } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './BlockedTab.module.scss';
import { useBlockedTab } from './useBlockedTab';

export const BlockedTab = () => {
  const { blockList, page, setPage, PER_PAGE, totalCount, currentIdentity } = useBlockedTab();
  return (
    <div className={css.container}>
      {blockList.map((item) => {
        const account = [item.requested, item.requester].find((item) => item.meta.id !== currentIdentity?.id);
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

            <Button
              variant="outlined"
              color="primary"
              style={{ height: '40px', fontSize: '14px' }}
              // onClick={() => redirectToChat(accountItem.id)}
            >
              Unblock
            </Button>
          </div>
        );
      })}
      {blockList.length > 0 && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(totalCount / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {blockList.length > 0 && (
        <div className="mt-11 block md:hidden">
          <PaginationMobile page={page} count={Math.ceil(totalCount / PER_PAGE)} handleChange={setPage} />
        </div>
      )}
      {/* <AlertModal
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        title="Remove connection"
        message={`Are you sure you want to remove ${fullName} as a connection? ${firstName} won’t be notified.`}
        customIcon={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        closeButtn={true}
        closeButtonLabel="Cancel"
        submitButton={true}
        submitButtonTheme="primary"
        submitButtonLabel="Remove"
        onSubmit={() => handleRemoveConnection(connectionId)}
      /> */}
    </div>
  );
};
