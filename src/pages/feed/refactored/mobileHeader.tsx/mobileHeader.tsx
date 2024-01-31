import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Search } from 'src/components/atoms/search/search';
import { CurrentIdentity } from 'src/core/api';
import { RootState } from 'src/store';
import { visibility } from 'src/store/reducers/menu.reducer';

import css from './mobileHeader.module.scss';

const MobileHeader = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const avatarImg = useSelector<RootState, string>((state) => {
    return state.identity.avatarImage;
  });

  const onSearchEnter = (value: string) => {
    navigate(`/search?q=${value}&type=projects&page=1`);
  };

  function openSidebar() {
    dispatch(visibility(true));
  }
  return (
    <div className={css.container}>
      <div className={css.menu}>
        {identity && <Avatar onClick={openSidebar} size="2.25rem" type={identity.type} img={avatarImg} />}
        <Search placeholder="Search" onEnter={onSearchEnter} />
        <div>
          <img className="p-0 m-0 h-8" src="icons/chat-white.svg" alt="" />
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
