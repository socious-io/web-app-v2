import { Modal } from '@mui/material';
import QRCode from 'react-qr-code';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Icon } from 'src/modules/general/components/Icon';
import { Input } from 'src/modules/general/components/input/input';
import variables from 'src/styles/constants/_exports.module.scss';

import { ShareProfileProps } from './index.types';
import css from './shareProfile.module.scss';
import { useShareProfile } from './useShareProfile';

export const ShareProfile: React.FC<ShareProfileProps> = ({ open, handleClose, identity }) => {
  const {
    data: { url, copied, username, name, profileImage, type },
    operations: { onCopyClick, onCloseModal },
  } = useShareProfile(handleClose, identity);

  return (
    <Modal open={open} onClose={onCloseModal}>
      <div className={css['modal']}>
        <div className={css['modal__banner']} />
        <div className={css['modal__content']}>
          <div className={css['user']}>
            <Avatar size="96px" type={type || 'users'} img={profileImage} hasBorder customStyle={css['user__avatar']} />
            <span className={css['user__name']}>{name}</span>
            {username}
          </div>
          <QRCode value={url} size={200} className="self-center" />
          <Input
            id="copy-url"
            value={url}
            disabled
            postfix={
              <div className={copied ? css['copy--success'] : css['copy']} onClick={onCopyClick}>
                <Icon
                  name={copied ? 'check' : 'copy-01'}
                  fontSize={20}
                  color={copied ? variables.color_success_700 : variables.color_grey_700}
                />
                Copy
              </div>
            }
          />
        </div>
      </div>
    </Modal>
  );
};
