import { getIdentityMeta } from 'src/core/utils';

import css from './connectionTab.module.scss';
import { useConnectionTab } from './useConnectionTab';
import { AvatarLabelGroup } from '../../general/components/avatarLabelGroup';

export const ConnectionTab = () => {
  const { page, connectionList, currentIdentity } = useConnectionTab();
  return (
    <div className={css.container}>
      {connectionList.map((item) => {
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
            {/* <div className={css.action}>
                <Button variant='contained' color='primary'>Message</Button>
                <T
            </div> */}
          </div>
        );
      })}
    </div>
  );
};

export default ConnectionTab;
