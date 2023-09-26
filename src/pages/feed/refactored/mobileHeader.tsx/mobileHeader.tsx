import { useDispatch, useSelector } from 'react-redux';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { IdentityReq } from 'src/core/types';
import { RootState } from 'src/store/store';
import { visibility } from 'src/store/reducers/menu.reducer';
import css from './mobileHeader.module.scss';
import { Search } from 'src/components/atoms/search/search';

const MobileHeader = () => {
  const navigate = {};
  const dispatch = useDispatch();
  const identity = useSelector<RootState, IdentityReq | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = identity?.meta?.avatar || identity?.meta?.image;

  const onSearchEnter = (value: string) => {
    navigate({ to: `/search?q=${value}` });
  };

  function openSidebar() {
    dispatch(visibility(true));
  }
  return (
    <div className={css.container}>
      <div className={css.menu}>
        <Avatar onClick={openSidebar} size="2.25rem" type={identity?.type} img={avatarImg} />
        <Search placeholder="Search" onEnter={onSearchEnter} />
        <div>
          <img className="p-0 m-0 h-8" src="icons/chat-white.svg" />
        </div>
      </div>
      <div>
        <div className={css.title}>Feed</div>
        <div className={css.tagline}>See What is happening in your network</div>
      </div>
    </div>
  );
};

export default MobileHeader;
