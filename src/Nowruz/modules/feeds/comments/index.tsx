import React from 'react';
import { toRelativeTime } from 'src/core/relative-time';
import { getIdentityMeta } from 'src/core/utils';
import { Icon } from 'src/Nowruz/general/Icon';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import CustomEmojiPicker from 'src/Nowruz/modules/general/components/EmojiPicker';
import { ExpandableText } from 'src/Nowruz/modules/general/components/expandableText';

import { CommentsProps } from './index.types';
import { useComments } from './useComments';
import Replies from '../replies';

const Comments: React.FC<CommentsProps> = ({
  postId,
  list,
  onReply,
  onShowReplies,
  replies = [],
  showSeeMoreComments = false,
  onSeeMoreCommentsClick,
  onSeeMoreRepliesClick,
}) => {
  const {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  } = useComments(postId, list);

  return (
    <>
      {list.map(item => {
        const { profileImage, type, name } = getIdentityMeta(item.identity_meta);
        return (
          <div key={item.id} className="flex gap-3 items-start">
            <Avatar type={type || 'users'} size="2rem" img={(profileImage as string) || ''} />
            <div className="flex-1 flex flex-col relative gap-1">
              <div className="flex justify-between">
                <span className="text-sm text-Gray-light-mode-900">{name}</span>
                <span className="text-xs text-Gray-light-mode-600">
                  {toRelativeTime(new Date(item.created_at).toString())}
                </span>
              </div>
              <ExpandableText
                text={item.content}
                expectedLength={100}
                customStyle="bg-Gray-light-mode-100 py-2 px-3 rounded-default emoji-font break-all"
              />
              <div className="flex items-center gap-1">
                <Icon
                  name="face-smile"
                  fontSize={19}
                  className="text-Gray-light-mode-500"
                  cursor="pointer"
                  containerClass="cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl"
                  onClick={() => setOpenEmojiPicker(item.id)}
                />
                {!!emojis[item.id]?.length &&
                  emojis[item.id].map(emoji => (
                    <div
                      key={emoji.emoji}
                      className="emoji-font cursor-pointer bg-Gray-light-mode-50 py-1 px-2 rounded-xl text-sm text-Gray-light-mode-600"
                      onClick={() => onPreviewClick(emoji.emoji, item.id)}
                    >
                      {!!emoji?.identities?.length && emoji?.identities?.length}
                      {emoji.emoji}
                    </div>
                  ))}
                <span
                  className="text-sm text-Gray-light-mode-600 cursor-pointer ml-1"
                  onClick={() => onReply({ replyTo: name || '', commentId: item.id })}
                >
                  Reply
                </span>
              </div>
              {openEmojiPicker === item.id && (
                <CustomEmojiPicker
                  open={!!openEmojiPicker}
                  handleClose={() => setOpenEmojiPicker('')}
                  onEmojiSelect={emoji => onEmojiSelect(emoji.native, item.id)}
                  customStyle="top-[-212px]"
                />
              )}
              {replies[item.id] && replies[item.id].showed ? (
                <Replies
                  postId={postId}
                  commentId={item.id}
                  list={replies[item.id].items}
                  showSeeMore={replies[item.id].items.length < replies[item.id].total_count}
                  onSeeMoreClick={() => onSeeMoreRepliesClick?.(item.id)}
                />
              ) : (
                (replies[item.id] || item.replied) && (
                  <span className="see-more text-center" onClick={() => onShowReplies?.(item.id)}>
                    Show replies
                  </span>
                )
              )}
            </div>
          </div>
        );
      })}
      {showSeeMoreComments && (
        <span className="see-more text-center" onClick={onSeeMoreCommentsClick}>
          See more
        </span>
      )}
    </>
  );
};

export default Comments;
