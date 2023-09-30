import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { likePost, Post, posts, PostsRes, unlikePost } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import { endpoint } from 'src/core/endpoints';

export const useFeed = () => {
  const list = useLoaderData() as PostsRes;
  const [openDialog, setOpenDialog] = useState(false);
  const [feedList, setFeedList] = useState(list.items);
  const [page, setPage] = useState(1);
  const totalCount = list.total_count;

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const onLike = (id: string) => {
    const clone = [...feedList];
    const ref = clone.find((item) => item.id === id) as Post;
    ref.liked = true;
    ref.likes = ref.likes + 1;
    setFeedList(clone);
    likePost(id);
  };

  const onRemoveLike = (id: string) => {
    const clone = [...feedList];
    const ref = clone.find((item) => item.id === id) as Post;
    ref.liked = false;
    ref.likes = ref.likes - 1;
    setFeedList(clone);
    unlikePost(id);
  };

  function onMorePage() {
    posts({ page: page + 1 }).then((resp) => {
      setPage((v) => v + 1);
      setFeedList((list) => [...list, ...resp.items]);
    });
  }

  const onShowSeeMore = (length: number): boolean => {
    return length < totalCount;
  };

  const onMoreClick = (index: number, feed: Post) => {
    switch (index) {
      case 0:
        if (feed?.id) {
          endpoint.post.posts['{post_id}/report'](feed?.id, { blocked: true, comment: 'comment' }).then(() => {
            dialog.alert({ title: 'Blocked', message: 'You successfully blocked the feed' });
          });
        }
        break;
      case 1:
        if (feed?.id) {
          endpoint.post.posts['{post_id}/report'](feed?.id, { blocked: false, comment: 'comment' }).then(() => {
            dialog.alert({ title: 'Report', message: 'You successfully Reported the feed' });
          });
        }
        break;
    }
  };

  return {
    feedList,
    setFeedList,
    handleClickOpen,
    openDialog,
    handleClose,
    onLike,
    onRemoveLike,
    onMorePage,
    onShowSeeMore,
    onMoreClick,
  };
};
