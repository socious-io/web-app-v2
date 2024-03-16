import { getIdentityMeta } from 'src/core/utils';
import { Pagination } from '../../general/components/Pagination';
import { PaginationMobile } from '../../general/components/paginationMobile';
import css from './requestTab.module.scss';
import { useRequestTab } from './useRequetTab';
import { AvatarLabelGroup } from '../../general/components/avatarLabelGroup';
import { Button } from '../../general/components/Button';

export const RequestTab = () => {
  const { connectRequests, page, setPage, totalCount, PER_PAGE, handleAccept, handleReject } = useRequestTab();
  return (
    <div className={css.container}>
      {connectRequests.map((item) => {
        const account = item.requester;
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
                variant="outlined"
                color="primary"
                style={{ height: '40px', fontSize: '14px' }}
                onClick={() => handleReject(item.id)}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ height: '40px', fontSize: '14px' }}
                onClick={() => handleAccept(item.id)}
              >
                Accept
              </Button>
            </div>
          </div>
        );
      })}
      {connectRequests.length > 0 && (
        <div className="mt-11 hidden md:block">
          <Pagination page={page} count={Math.ceil(totalCount / PER_PAGE)} onChange={(e, p) => setPage(p)} />
        </div>
      )}
      {connectRequests.length > 0 && (
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
