import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'src/modules/general/components/Icon';

import { FeedActionsProps } from './index.types';

const FeedActions: React.FC<FeedActionsProps> = ({
  liked,
  onLikeClick,
  onCommentClick,
  onRepostClick,
  hasRepostAction = true,
}) => {
  const { t } = useTranslation('communities');

  return (
    <div className="flex">
      <div className="flex-1 flex justify-center">
        <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={() => onLikeClick(liked)}>
          {liked ? (
            <img src="/icons/nowruz/red-heart.svg" alt="" />
          ) : (
            <Icon name="heart" fontSize={20} className="text-Gray-light-mode-600" cursor="pointer" />
          )}
          <span className="hidden md:inline">{t('post_like_reaction')}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={onCommentClick}>
          <Icon name="message-text-square-01" fontSize={20} className="text-Gray-light-mode-600" cursor="pointer" />
          <span className="hidden md:inline">{t('post_comment_reaction')}</span>
        </div>
      </div>
      {hasRepostAction && (
        <div className="flex-1 flex justify-center">
          <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={onRepostClick}>
            <Icon name="refresh-ccw-02" fontSize={20} className="text-Gray-light-mode-600" cursor="pointer" />
            <span className="hidden md:inline">{t('post_repost_reaction')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedActions;
