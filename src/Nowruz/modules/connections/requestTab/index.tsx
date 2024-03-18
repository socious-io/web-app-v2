import { getIdentityMeta } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/Nowruz/modules/general/components/avatarLabelGroup';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { Pagination } from 'src/Nowruz/modules/general/components/Pagination';
import { PaginationMobile } from 'src/Nowruz/modules/general/components/paginationMobile';

import css from './requestTab.module.scss';
import { useRequestTab } from './useRequetTab';

export const RequestTab = () => {
  const {
    connectRequests,
    page,
    setPage,
    totalCount,
    PER_PAGE,
    handleAccept,
    handleReject,
    openAcceptModal,
    setOpenAcceptModal,
    handleOpenAcceptModal,
    selectedRequest,
  } = useRequestTab();

  const requester = selectedRequest?.requester;

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleAccept}>
        Accept
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="secondary" onClick={() => handleReject()}>
        Decline
      </Button>
    </div>
  );

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
                variant="text"
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
                onClick={() => handleOpenAcceptModal(item.id)}
              >
                View
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

      <Modal
        open={openAcceptModal}
        handleClose={() => setOpenAcceptModal(false)}
        icon={<FeaturedIcon iconName="user-plus-01" size="lg" theme="gray" type="modern" />}
        title=""
        subTitle=""
        footer={footerJsx}
        mobileFullHeight={false}
        headerDivider={false}
        footerDivider={false}
        customStyle="w-full md:!w-[400px]"
      >
        <div className="flex flex-col gap-5 px-4 md:px-6 py-4">
          <div className="w-full flex flex-col gap-1">
            <div className="text-lg font-semibold text-Gray-light-mode-900">{`${selectedRequest?.requester.meta.name} has sent you a connection request`}</div>
            <div className="text-sm font-normal text-Gray-light-mode-600">{selectedRequest?.text}</div>
          </div>
          <AvatarLabelGroup
            account={{
              id: requester?.id || '',
              img: requester?.meta.avatar || requester?.meta.image || '',
              type: requester?.type || 'users',
              name: requester?.meta.name || '',
              username: requester?.meta.username || requester?.meta.shortname,
            }}
            customStyle="!px-0"
          />
        </div>
      </Modal>
    </div>
  );
};
