import EmojiPicker from '@emoji-mart/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrentIdentity } from 'src/core/api';
import { isTouchDevice } from 'src/core/device-type-detector';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Chip } from 'src/Nowruz/modules/general/components/Chip';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';
import { Modal } from 'src/Nowruz/modules/general/components/modal';
import { RootState } from 'src/store';

import css from './index.module.scss';
import { RepostModalProps } from './index.types';

const RepostModal: React.FC<RepostModalProps> = ({ data, open, handleClose, onRepost }) => {
  const isMobile = isTouchDevice();
  const { profileImage, name, username, date, cause, title, content, media } = data || {};
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const {
    profileImage: currentProfileImage,
    name: currentName,
    username: currentUsername,
  } = getIdentityMeta(currentIdentity);
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [contentRepost, setContentRepost] = useState('');

  const headerContentJSX = (
    <div className="flex items-center gap-3">
      <Avatar size="3rem" type="users" img={(currentProfileImage as string) || ''} />
      <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
        {currentName}
        <span className="font-normal text-Gray-light-mode-500">{currentUsername}</span>
      </div>
    </div>
  );

  const footerModalJSX = (
    <div className="w-full px-6 py-4 flex justify-between items-center">
      <Icon
        name="face-smile"
        fontSize={24}
        cursor="pointer"
        className="text-Gray-light-mode-700"
        onClick={() => setOpenEmojiPicker(true)}
      />
      <Button color="primary" onClick={() => onRepost(contentRepost)}>
        Post
      </Button>
    </div>
  );

  return (
    <Modal
      open={open}
      handleClose={handleClose}
      title={headerContentJSX}
      footer={footerModalJSX}
      headerDivider={false}
      contentClassName="h-full"
      customStyle="relative"
    >
      <div className="p-6 pt-0 flex flex-col gap-4">
        <textarea
          name="repost"
          value={contentRepost}
          onChange={e => setContentRepost(e.target.value)}
          className={css.textarea}
          placeholder="Start writing..."
          rows={1}
        />
        <div className="p-6 flex flex-col gap-6 border border-solid border-Gray-light-mode-200 rounded-default">
          <div className="w-full flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar size="3rem" type="users" img={(profileImage as string) || ''} />
              <div className="flex flex-col text-md font-semibold text-Gray-light-mode-900">
                {name}
                <span className="font-normal text-Gray-light-mode-500">{username}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-Gray-light-mode-600">{toRelativeTime(date)}</span>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-6">
            {cause && <Chip theme="primary" size="md" label={cause} />}
            {title && <div className="text-xl font-semibold emoji-font break-all">{title}</div>}
            <ExpandableText
              text={content}
              seeMoreText="See more"
              isMarkdown
              seeMoreButton
              expectedLength={isMobile ? 225 : 450}
              customStyle="flex flex-col gap-4 text-sm text-Gray-light-mode-700 leading-5 emoji-font break-all"
            />
          </div>
          <div className="flex self-center">
            <img src={media} alt="image-post" className="rounded-lg" />
          </div>
        </div>
      </div>
      {openEmojiPicker && (
        <div className="max-w-[358px] max-h-[300px] overflow-y-auto absolute bottom-9 left-9 z-10 border border-solid border-Gray-light-mode-200 rounded-lg">
          <EmojiPicker
            open={openEmojiPicker}
            theme="light"
            previewPosition="none"
            onEmojiSelect={value => {
              setContentRepost(prev => (prev ? prev + value.native : value.native));
              setOpenEmojiPicker(false);
            }}
          />
        </div>
      )}
    </Modal>
  );
};

export default RepostModal;
