import { getIdentityMeta, translate } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Modal } from 'src/modules/general/components/modal';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';

import { RequestTabProps } from './index.types';
import css from './requestTab.module.scss';
import { useRequestTab } from './useRequestTab';

export const RequestTab: React.FC<RequestTabProps> = ({ requestType }) => {
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
    isRequestedType,
    getAccount,
  } = useRequestTab(requestType);
  const {
    profileImage: img = '',
    type = 'users',
    name = '',
    username = '',
  } = getIdentityMeta(selectedRequest?.requester);

  const footerJsx = (
    <div className="w-full flex flex-col md:flex-row-reverse px-4 py-4 md:px-6 md:py-6 gap-3 md:justify-start">
      <Button customStyle="w-full md:w-fit " variant="contained" color="primary" onClick={handleAccept}>
        {translate('connect-accept')}
      </Button>
      <Button customStyle="w-full md:w-fit " variant="outlined" color="secondary" onClick={() => handleReject()}>
        {translate('connect-decline')}
      </Button>
    </div>
  );

  return (
    <div className={css.container}>
      {connectRequests.map(item => {
        const account = getAccount(item);
        const { profileImage: img = '', type = 'users', name = '', username = '' } = getIdentityMeta(account);
        const accountItem = {
          id: account?.id || '',
          img,
          type,
          name,
          username: username.replace('@', ''),
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
                {translate('connect-decline')}
              </Button>
              {isRequestedType && (
                <Button
                  variant="contained"
                  color="primary"
                  style={{ height: '40px', fontSize: '14px' }}
                  onClick={() => handleOpenAcceptModal(item.id)}
                >
                  {translate('connect-view')}
                </Button>
              )}
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
            <div className="text-lg font-semibold text-Gray-light-mode-900">
              {translate('connect-accept-alert', { name })}
            </div>
            <div className="text-sm font-normal text-Gray-light-mode-600">{selectedRequest?.text}</div>
          </div>
          <AvatarLabelGroup
            account={{
              id: selectedRequest?.id || '',
              img,
              type,
              name,
              username,
            }}
            customStyle="!px-0"
          />
        </div>
      </Modal>
    </div>
  );
};
