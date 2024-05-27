import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { CurrentIdentity, Post, posts } from 'src/core/api';
import { getIdentityMeta } from 'src/core/utils';
import { RootState } from 'src/store';

import { Resolver } from './index.types';

export const UseFeeds = () => {
  const postsResponse = useLoaderData() as Resolver;
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const { profileImage } = getIdentityMeta(currentIdentity);
  const { page, total_count } = postsResponse || {};
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [currentPosts, setCurrentPosts] = useState(postsResponse.items || []);
  const [currentPage, setCurrentPage] = useState(page);
  const showSeeMore = currentPosts.length < total_count;

  const handleOpenCreateModal = () => setOpenCreateModal(true);

  const handleCloseCreateModal = () => setOpenCreateModal(false);

  const onCreatePost = async () => {
    try {
      const { items } = (await posts({ page })) || [];
      if (items.length) setCurrentPosts(items);
    } catch (error) {
      console.log('error in fetching posts', error);
    }
  };

  const onShowMoreFeeds = async () => {
    try {
      const { items } = (await posts({ page: currentPage + 1 })) || [];
      if (items.length) {
        setCurrentPage(prev => prev + 1);
        setCurrentPosts(list => [...list, ...items]);
      }
    } catch (error) {
      console.log('error in fetching more posts', error);
    }
  };

  const updateFeedsListLiked = (id: string) => {
    const clone = [...currentPosts];
    const mappedClone = clone.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
          likes: item.liked ? item.likes - 1 : item.likes + 1,
        };
      } else {
        return item;
      }
    });
    setCurrentPosts(mappedClone);
  };

  const updateFeedsListRepost = (response: Post) => {
    const current = [response, ...currentPosts];
    setCurrentPosts(current);
  };

  return {
    data: { profileImage, openCreateModal, posts: currentPosts, showSeeMore },
    operations: {
      handleOpenCreateModal,
      handleCloseCreateModal,
      onCreatePost,
      onShowMoreFeeds,
      updateFeedsListLiked,
      updateFeedsListRepost,
    },
  };
};
