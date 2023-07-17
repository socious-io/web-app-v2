import { useState } from 'react';
import { useNavigate } from '@tanstack/react-location';
import { ProfileCard } from 'src/components/templates/profile-card';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CardMenu } from 'src/components/molecules/card-menu/card-menu';
import { FeedList } from 'src/components/organisms/feed-list/feed-list';
import { TwoColumnCursor } from 'src/components/templates/two-column-cursor/two-column-cursor';
import { Modal } from 'src/components/templates/modal/modal';
import { ModalCreate } from '../modal-create';
import { Feed } from 'src/components/organisms/feed-list/feed-list.types';
import { useFeedShared } from '../feed.shared';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { IdentityReq } from 'src/core/types';
import { printWhen } from 'src/core/utils';
import css from './desktop.module.scss';
import { useAuth } from 'src/hooks/use-auth';

export const Desktop = () => {
  const navigate = useNavigate();
  const {
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
  } = useFeedShared();
  const [openMoreBox, setOpenMoreBox] = useState(false);
  const [moreOptions, setMoreOptions] = useState<{ title: string }[]>([]);
  const [feed, setFeed] = useState<Feed>();
  const { isLoggedIn } = useAuth();

  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const { showIfLoggedIn } = useAuth();

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const showActions = async (feed: Feed) => {
    const name = feed.identity_meta.name;
    const options = [{ title: `Block ${name}` }, { title: `Report ${name}` }, { title: 'Cancel' }];
    setMoreOptions(options);
    setFeed(feed);
    setOpenMoreBox(true);
  };

  const onClickMoreOption = (index: number) => {
    onMoreClick(index, feed as Feed);
    setOpenMoreBox(false);
  };

  const NetworkMenuList = [
    { label: 'Connections', icon: '/icons/connection.svg', link: () => navigate({ to: '/network/connections' }) },
    { label: 'Followings', icon: '/icons/followers.svg', link: () => navigate({ to: '/network/followings' }) },
  ];

  const NetworkMenuListOrg = [
    ...NetworkMenuList,
    { label: 'Team', icon: '/icons/team.svg', link: () => navigate({ to: `/team/${identity.id}` }) },
  ];

  const jobsMenuListUser = [
    {
      label: 'My applications',
      icon: '/icons/my-applications.svg',
      link: () => navigate({ to: `/d/jobs/applied/${identity.id}` }),
    },
  ];

  const jobsMenuListOrg = [
    {
      label: 'Created',
      icon: '/icons/folder-black.svg',
      link: () => navigate({ to: `/d/jobs/created/${identity.id}` }),
    },
  ];

  const createPostJSX = (
    <Card>
      <div className={css.createWrapper}>
        <Avatar size="3rem" type="users" img={avatarImg} />
        <div onClick={handleClickOpen} className={css.createButton}>
          Create a post
        </div>
      </div>
    </Card>
  );

  return (
    <TwoColumnCursor visibleSidebar={isLoggedIn}>
      <div className={css.sidebar}>
        <ProfileCard />
        <CardMenu title="Network" list={identity?.type === 'organizations' ? NetworkMenuListOrg : NetworkMenuList} />
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListUser} />, identity?.type === 'users')}
        {printWhen(<CardMenu title="Jobs" list={jobsMenuListOrg} />, identity?.type === 'organizations')}
      </div>
      <>
        <div className={css.banner}>
          <div className={css.title}>Your Feed</div>
          <div className={css.tagline}>See what is happening in your network</div>
        </div>
        <div className={css.create}>{showIfLoggedIn(createPostJSX)}</div>
        <div className={css.list}>
          <FeedList
            data={feedList}
            onMoreClick={(feed) => showActions(feed)}
            onLike={onLike}
            onRemoveLike={onRemoveLike}
            onMorePageClick={onMorePage}
            showSeeMore={onShowSeeMore(feedList.length)}
          />
          <Modal open={openMoreBox} onClose={() => setOpenMoreBox(false)}>
            <div className={css.moreBox}>
              <div className={css.moreHeader}>What do you want to do?</div>
              {moreOptions?.map((option, index) => (
                <div key={option.title} className={css.moreOption} onClick={() => onClickMoreOption(index)}>
                  {option.title}
                </div>
              ))}
            </div>
          </Modal>
        </div>
        <ModalCreate open={openDialog} onClose={handleClose} setFeedList={setFeedList} />
      </>
    </TwoColumnCursor>
  );
};
