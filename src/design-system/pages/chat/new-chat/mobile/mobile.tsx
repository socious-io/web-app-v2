import { HeaderStaticMobile } from '../../../../templates/header-static-mobile/header-static-mobile';
import { Header } from '../../../../atoms/header/header';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ContactList } from '../../../../organisms/contact-list/contact-list';
import { Avatar } from '../../../../atoms/avatar/avatar';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { FollowingsReq, IdentityReq, Pagination } from '../../../../../core/types';
import { FollowingsLoader } from '../new-chat.types';
import { convertFollowingsToContactList, getFollowings, postFind } from '../new-chat.services';
import { ContactItem } from '../../../../molecules/contact-item/contact-item.types';
import { useState } from 'react';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const followingsResp = useMatch<FollowingsLoader>().ownData as Pagination<FollowingsReq[]>;
  const initialList = convertFollowingsToContactList(followingsResp.items);
  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });
  const [list, setList] = useState(initialList);

  async function onSearch(name: string) {
    convertFollowingsToContactList(followingsResp.items);
    getFollowings({ page: 1, name })
      .then(({ items }) => convertFollowingsToContactList(items))
      .then(setList);
  }

  function onContactClick(contact: ContactItem) {
    const identityId = followingsResp.items.find((item) => item.id === contact.id)?.identity_id;
    const payload = { participants: [identityId || ''] };
    postFind(payload).then((resp) => {
      navigate({ to: `/chats/contacts/${resp.items[0].id}` });
    });
  }

  return (
    <HeaderStaticMobile>
      <Header
        onBack={() => navigate({ to: '/chats/contacts' })}
        border="0"
        height="auto"
        title="Chats"
        right={<Avatar size="2rem" type="users" img={identity.meta.image} />}
      />
      <ContactList onContactClick={onContactClick} list={list} onSearch={onSearch} />
    </HeaderStaticMobile>
  );
};
