import React from 'react';
import { translate } from 'src/core/utils';
import { Icon } from 'src/modules/general/components/Icon';

import { FeedActionsProps } from './index.types';

const FeedActions: React.FC<FeedActionsProps> = ({
  liked,
  onLikeClick,
  onCommentClick,
  onRepostClick,
  hasRepostAction = true,
}) => {
  return (
    <div className="flex">
      <div className="flex-1 flex justify-center">
        <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={() => onLikeClick(liked)} data-testid="like-button">
          <Icon
            name={liked ? 'heart-filled' : 'heart'}
            fontSize={20}
            className={liked ? 'text-Error-700' : 'text-Gray-light-mode-600'}
            cursor="pointer"
          />
          <span className="hidden md:inline">{translate('feeds-action-like')}</span>
        </div>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={onCommentClick}>
          <Icon name="message-text-square-01" fontSize={20} className="text-Gray-light-mode-600" cursor="pointer" />
          <span className="hidden md:inline">{translate('feeds-action-comment')}</span>
        </div>
      </div>
      {hasRepostAction && (
        <div className="flex-1 flex justify-center">
          <div className="flex gap-2 text-sm text-Gray-light-mode-600 cursor-pointer" onClick={onRepostClick}>
            <Icon name="refresh-ccw-02" fontSize={20} className="text-Gray-light-mode-600" cursor="pointer" />
            <span className="hidden md:inline">{translate('feeds-action-repost')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedActions;
