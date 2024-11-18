import { getIdentityMeta, translate } from 'src/core/utils';
import { AvatarLabelGroup } from 'src/modules/general/components/avatarLabelGroup';
import { Button } from 'src/modules/general/components/Button';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';

import css from './BlockedTab.module.scss';
import { useBlockedTab } from './useBlockedTab';

export const BlockedTab = () => {
  const { blockList, page, setPage, PER_PAGE, totalCount, currentIdentity, handleUnblock } = useBlockedTab();
  return (
    <div className={css.container}>
      {blockList.map(item => {
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

            <Button
              variant="outlined"
              color="primary"
              style={{ height: '40px', fontSize: '14px' }}
              onClick={() => handleUnblock(item.id)}
            >
              {translate('connect-unblock')}
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
    </div>
  );
};
