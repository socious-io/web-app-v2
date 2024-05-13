import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Comment, CurrentIdentity, reactPostComment, unreactPostComment } from 'src/core/api';
import { RootState } from 'src/store';

import { SelectedEmoji } from './index.types';
import { useFeedsContext } from '../contexts/feeds.context';

export const useComments = (postId: string, list: Comment[]) => {
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const currentIdentityId = currentIdentity?.id;
  const { state, dispatch } = useFeedsContext();
  const { comments } = state || {};
  const [openEmojiPicker, setOpenEmojiPicker] = useState('');
  const [emojis, setEmojis] = useState<Record<string, SelectedEmoji[]>>({});
  const defaultRecommendedEmojis = [
    { emoji: '❤️', identities: [] },
    { emoji: '👌', identities: [] },
    { emoji: '🙂', identities: [] },
  ];

  useEffect(() => {
    const commentsWithEmojisMap: Record<string, SelectedEmoji[]> = {};
    list.forEach(comment => {
      const commentId = comment.id;
      const existingEmojis: SelectedEmoji[] = [];
      (comment.emojis || []).forEach(emoji => {
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
      commentsWithEmojisMap[commentId] = mergedEmojis;
    });
    setEmojis(commentsWithEmojisMap);
  }, [list]);

  const reactedCurrentIdentity = (emojiName: string, commentId: string) => {
    const findIdentity = emojis[commentId]?.find(emoji => {
      if (emojiName === emoji.emoji) {
        return emoji.identities.findIndex(identity => identity.id === currentIdentityId) !== -1;
      } else {
        return false;
      }
    });
    return findIdentity;
  };

  const updateCommentWithEmojis = (commentId: string, newEmojis: SelectedEmoji[]) => {
    //FIXME: it's better the structure of emojis in response of API changed. (BE)
    const updatedList = list.map(comment => {
      if (comment.id === commentId) {
        const updatedEmojis = newEmojis.flatMap(emoji =>
          emoji.identities.map(identity => ({
            emoji: emoji.emoji,
            identity: identity,
          })),
        );
        return {
          ...comment,
          emojis: updatedEmojis,
        };
      }
      return comment;
    });

    dispatch({
      type: 'comments',
      value: { ...comments, [postId]: { ...comments[postId], items: updatedList as Comment[] } },
    });
  };

  const onPreviewClick = async (emojiName: string, commentId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, commentId);
      if (findIdentity) {
        await unreactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { ...emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      } else {
        await reactPostComment(postId, commentId, emojiName);
        const updatedEmojis = (emojis[commentId] || []).map(emoji => {
          if (emoji.emoji === emojiName) {
            return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
          } else {
            return emoji;
          }
        });
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting comments', error);
    }
  };

  const onEmojiSelect = async (emojiName: string, commentId: string) => {
    try {
      const findIdentity = reactedCurrentIdentity(emojiName, commentId);
      if (findIdentity) {
        await unreactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji !== emojiName) {
              return emoji;
            } else {
              const filteredIdentities = emoji.identities.filter(identity => identity.id !== currentIdentityId);
              return { emoji: emoji.emoji, identities: filteredIdentities };
            }
          }) || [];
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      } else {
        await reactPostComment(postId, commentId, emojiName);
        const updatedEmojis =
          emojis[commentId]?.map(emoji => {
            if (emoji.emoji === emojiName) {
              return { ...emoji, identities: [...emoji.identities, { id: currentIdentityId }] };
            } else {
              return emoji;
            }
          }) || [];
        if (!updatedEmojis.some(emoji => emoji.emoji === emojiName)) {
          updatedEmojis.push({ emoji: emojiName, identities: [{ id: currentIdentityId }] });
        }
        setEmojis({ ...emojis, [commentId]: updatedEmojis });
        updateCommentWithEmojis(commentId, updatedEmojis);
      }
    } catch (error) {
      console.log('error in un/reacting comments', error);
    }
    setOpenEmojiPicker('');
  };

  return {
    data: { emojis, openEmojiPicker },
    operations: { setOpenEmojiPicker, onPreviewClick, onEmojiSelect },
  };
};
