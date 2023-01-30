import { useMatch, useNavigate } from '@tanstack/react-location';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { IdentityReq } from '../../../../../core/types';
import { RootState } from '../../../../../store/store';
import { Avatar } from '../../../../atoms/avatar/avatar';
import { Fab } from '../../../../atoms/fab/fab';
import { Header } from '../../../../atoms/header/header';
import { ContactItem } from '../../../../molecules/contact-item/contact-item.types';
import { ContactList } from '../../../../organisms/contact-list/contact-list';
import { HeaderStaticMobile } from '../../../../templates/header-static-mobile/header-static-mobile';
import { chatEntityToContactListAdaptor, getChatsSummery } from '../contact-list.services';

export const Mobile = (): JSX.Element => {
  const resolver = useMatch();
  const initialState = chatEntityToContactListAdaptor(resolver.ownData.items);
  const [chats, setChats] = useState<ContactItem[]>(initialState);
  const [state, setState] = useState({ page: 1, filter: '' });

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const navigate = useNavigate();

  function onSearch(value: string) {
    const payload = { page: 1, filter: value };
    getChatsSummery(payload).then((resp) => {
      setChats(chatEntityToContactListAdaptor(resp.items));
      setState(payload);
    });
  }

  function onScroll(page: number) {
    const payload = { ...state, page: state.page + 1 };
    getChatsSummery(payload).then((resp) => {
      const newList = chatEntityToContactListAdaptor(resp.items);
      setChats([...chats, ...newList]);
      setState(payload);
    });
  }

  return (
    <>
      <HeaderStaticMobile>
        <Header
          onBack={() => navigate({ to: '/jobs' })}
          border="0"
          height="auto"
          title="Chats"
          right={<Avatar size="2rem" type="users" img={identity.meta.image} />}
        />
        <ContactList
          height="calc(var(--window-height) - var(--safe-area) + 1.5rem)"
          onScroll={onScroll}
          onContactClick={(contact) => navigate({ to: contact.id })}
          list={chats}
          onSearch={onSearch}
        />
      </HeaderStaticMobile>
      <Fab onClick={() => navigate({ to: '/chats/new' })} />
    </>
  );
};
