import { useMatch, useNavigate } from '@tanstack/react-location';
import React, { useState } from 'react';
import { FeedItem } from 'src/components/molecules/feed-item/feed-item';
import { ProfileCard } from 'src/components/templates/profile-card';
import { useAuth } from 'src/hooks/use-auth';
import feedcss from '../feed.module.scss';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { IdentityReq, Pagination } from 'src/core/types';
import { CommentModel } from './feedDetail.types';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { hapticsImpactLight } from 'src/core/haptic/haptic';
import { like, unlike } from '../feed.service';
import { addComment, getComments, likeComment, removeCommentLike } from './post-detail.service';
import { endpoint } from 'src/core/endpoints';
import { dialog } from 'src/core/dialog/dialog';
import { socialCausesToCategory } from 'src/core/adaptors';
import { Card } from 'src/components/atoms/card/card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { SendBox } from 'src/components/molecules/send-box/send-box';
import { Comment } from 'src/components/molecules/comment/comment';
import { Header } from 'src/components/atoms/header/header';
import { isTouchDevice } from 'src/core/device-type-detector';

const FeedDetails = () => {
  const { post, comments } = useMatch().ownData as {
    post: Feed;
    comments: Pagination<CommentModel[]>;
  };
  const [message, setMessage] = useState('');
  const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);
  const [postObj, setPostObj] = useState<Feed>(post);
  const [page, setPage] = useState(1);
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [moreOptions, setMoreOptions] = useState<{ title: string }[]>([]);
  const [feed, setFeed] = useState<Feed>();
  const totalCount = comments.total_count;
  const navigate = useNavigate();

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const onShowSeeMore = (length: number): boolean => {
    if (length < totalCount) {
      return true;
    }
    return false;
  };

  const actionList = (likes: number, liked: boolean) => [
    {
      label: 'Like',
      iconName: 'heart-blue',
      like: likes,
      isLiked: liked,
      onClick: () => {
        hapticsImpactLight();
        postObj!.liked ? onRemoveLike(postObj.id) : onLike(postObj.id);
      },
      onLike: () => {
        hapticsImpactLight();
        return onLike(postObj.id);
      },
      onRemoveLike: () => {
        hapticsImpactLight();
        onRemoveLike(postObj.id);
      },
    },
    { label: 'Comment', iconName: 'comment-blue' },
  ];

  const onLike = (id: string) => {
    like(id).then(() => {
      const clone = { ...postObj };
      clone.liked = true;
      clone.likes = clone.likes + 1;
      setPostObj(clone);
    });
  };

  const onRemoveLike = (id: string) => {
    unlike(id).then(() => {
      const clone = { ...postObj };
      clone.liked = false;
      clone.likes = clone.likes - 1;
      setPostObj(clone);
    });
  };

  const changeMessageHandler = (value: string) => {
    setMessage(value);
  };

  const sendMessage = () => {
    addComment(message, postObj.id).then(() => {
      getComments(postObj.id, 1).then((resp) => {
        setCommentList(resp.items);
        setMessage('');
      });
    });
  };

  function onMorePage() {
    getComments(postObj.id, page + 1).then((resp) => {
      setPage((v) => v + 1);
      setCommentList((list) => [...list, ...resp.items]);
    });
  }

  function updateHeartIcon(commentId: string, type: 'like' | 'removeLike') {
    return () => {
      const clone = [...commentList];
      const comment = clone.find((item) => item.id === commentId);
      if (comment) {
        comment.liked = type === 'like' ? true : false;
        comment.likes = type === 'like' ? comment.likes + 1 : comment.likes - 1;
      }
      setCommentList(clone);
    };
  }

  function onCommentLike(postId: string, commentId: string) {
    likeComment(postId, commentId).then(updateHeartIcon(commentId, 'like'));
  }

  function onCommentLikeRemove(postId: string, commentId: string) {
    removeCommentLike(postId, commentId).then(updateHeartIcon(commentId, 'removeLike'));
  }

  const showActions = async (feed: Feed) => {
    const name = feed.identity_meta.name;
    const options = [{ title: `Block ${name}` }, { title: `Report ${name}` }, { title: 'Cancel' }];
    setMoreOptions(options);
    setFeed(feed);
    setOpenMoreBox(true);
  };

  return (
    <div className="w-full h-full">
      <div className="md:hidden">
        <Header onBack={() => navigate({ to: '/feeds' })} title="Post" />
      </div>
      <div className={`${feedcss.container} p-4 md:p-0`}>
        <div className={`${feedcss.boundaries} md:mt-10 md:mr-10 md:mb-0 md:ml-10`}>
          <div className="w-[20rem] hidden md:block">
            <div className="grid grid-cols-1 gap-4">
              <ProfileCard />
            </div>
          </div>

          <div className="w-full max-w-[38.5rem] flex flex-col">
            <div>
              <FeedItem
                key={postObj.id}
                type={postObj.identity_type}
                img={postObj.media != null && postObj.media.length > 0 ? postObj.media[0]?.url : ''}
                imgAvatar={postObj.identity_meta.avatar || postObj.identity_meta?.image}
                text={postObj.content}
                name={postObj.identity_meta.name}
                actionList={actionList(postObj.likes, postObj.liked)}
                lineLimit="none"
                date={postObj.created_at}
                categories={socialCausesToCategory(postObj.causes_tags)}
                onMoreClick={() => showActions(postObj)}
              />

              <Card className="flex items-center gap-3 my-4 mx-0">
                <div className="hidden md:block">
                  <Avatar size="2rem" img={identity.meta.image} type={identity.type} />
                </div>
                <SendBox className="flex-1" onValueChange={changeMessageHandler} onSend={sendMessage} value={message} />
              </Card>

              <div className="w-full">
                <Comment
                  list={commentList}
                  onLike={onCommentLike}
                  onLikeRemove={onCommentLikeRemove}
                  onMorePageClick={onMorePage}
                  showSeeMore={onShowSeeMore(commentList.length)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedDetails;
