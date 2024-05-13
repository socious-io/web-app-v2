import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, CurrentIdentity, reactPostComment, unreactPostComment } from 'src/core/api';
import { RootState } from 'src/store';

import { SelectedEmoji } from './index.types';
import { useFeedsContext } from '../contexts/feeds.context';

export const useReplies = (postId: string, commentId: string, list: Comment[]) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityId = currentIdentity?.id;
  const { state, dispatch } = useFeedsContext();
  const { replies } = state || {};
  const [openEmojiPicker, setOpenEmojiPicker] = useState('');
  const [emojis, setEmojis] = useState<Record<string, SelectedEmoji[]>>({});
  const defaultRecommendedEmojis = [
    { emoji: '❤️', identities: [] },
    { emoji: '👌', identities: [] },
    { emoji: '🙂', identities: [] },
  ];

  useEffect(() => {
    const repliesWithEmojisMap: Record<string, SelectedEmoji[]> = {};
    list.forEach(reply => {
      const replyId = reply.id;
      const existingEmojis: SelectedEmoji[] = [];
      (reply.emojis || []).forEach(emoji => {
        if (!emoji.identity) {
          return { emoji: emoji.emoji, identities: [] };
        }
        const index = existingEmojis.findIndex(item => item.emoji === emoji.emoji);
        if (index !== -1) {
          existingEmojis[index].identities.push(emoji.identity);
        } else {
          existingEmojis.push({ emoji: emoji.emoji, identities: [emoji.identity] });
        }
      });
      const mergedEmojis = defaultRecommendedEmojis.map(defaultEmoji => {
        const existingEmoji = existingEmojis.find(emoji => emoji.emoji === defaultEmoji.emoji);
        return existingEmoji ? { ...defaultEmoji, identities: existingEmoji.identities } : defaultEmoji;
      });
      existingEmojis.forEach(existingEmoji => {
        if (!mergedEmojis.find(emoji => emoji.emoji === existingEmoji.emoji)) {
          mergedEmojis.push(existingEmoji);
        }
      });
      repliesWithEmojisMap[replyId] = mergedEmojis;
    });
    setEmojis(repliesWithEmojisMap);
  }, [list]);

  const reactedCurrentIdentity = (emojiName: string, replyId: string) => {
    const findIdentity = emojis[replyId]?.find(emoji => {
      if (emojiName === emoji.emoji) {
        return emoji.identities.findIndex(identity => identity.id === currentIdentityId) !== -1;
      } else {
        return false;
      }
    });
    return findIdentity;
  };

  const updateReplyWithEmojis = (replyId: string, newEmojis: SelectedEmoji[]) => {
    const updatedList = list.map(reply => {
      if (reply.id === replyId) {
        return {
          ...reply,
          emojis: newEmojis.map(emoji => ({
            emoji: emoji.emoji,
            identity: emoji.identities[0],
            created_at: new Date(),
          })),
        };
      }
      return reply;
    });
    dispatch({
      type: 'replies',
      value: { ...replies, [commentId]: { ...replies[commentId], items: updatedList as Comment[] } },
    });
  };

  const onPreviewClick = async (emojiName: string, replyId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, replyId);
      if (findIdentity) {
        await unreactPostComment(postId, replyId, emojiName);
        const updatedEmojis =
          emojis[replyId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { ...emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [replyId]: updatedEmojis });
        updateReplyWithEmojis(replyId, updatedEmojis);
      } else {
        await reactPostComment(postId, replyId, emojiName);
        const updatedEmojis = (emojis[replyId] || []).map(emoji => {
          if (emoji.emoji === emojiName) {
            return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
          } else {
            return emoji;
          }
        });
        setEmojis({ ...emojis, [replyId]: updatedEmojis });
        updateReplyWithEmojis(replyId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting replies', error);
    }
  };

  const onEmojiSelect = async (emojiName: string, replyId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, replyId);
      if (findIdentity) {
        await unreactPostComment(postId, replyId, emojiName);
        const updatedEmojis =
          emojis[replyId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { emoji: emoji.emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [replyId]: updatedEmojis });
        updateReplyWithEmojis(replyId, updatedEmojis);
      } else {
        await reactPostComment(postId, replyId, emojiName);
        const updatedEmojis =
          emojis[replyId]?.map(emoji => {
            if (emoji.emoji === emojiName) {
              return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
            } else {
              return emoji;
            }
          }) || [];
        if (!updatedEmojis.some(emoji => emoji.emoji === emojiName)) {
          updatedEmojis.push({ emoji: emojiName, identities: [{ id: currentIdentityId }] });
        }
        setEmojis({ ...emojis, [replyId]: updatedEmojis });
        updateReplyWithEmojis(replyId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting replies', error);
    }
    setOpenEmojiPicker('');
  };

  return {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  };
};
