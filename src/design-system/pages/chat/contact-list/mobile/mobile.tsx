import { useNavigate } from '@tanstack/react-location';
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
  const chatEntity: ContactItem[] = useSelector<RootState>((state) => {
    return chatEntityToContactListAdaptor(state.chat.entities);
  }) as ContactItem[];

  const identity = useSelector<RootState, IdentityReq>((state) => {
    return state.identity.entities.find((identity) => identity.current) as IdentityReq;
  });

  const navigate = useNavigate();

  function onSearch(value: string) {
    getChatsSummery({ page: 1, filter: value });
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
          onContactClick={(contact) => navigate({ to: contact.id })}
          list={chatEntity}
          onSearch={onSearch}
        />
      </HeaderStaticMobile>
      <Fab onClick={console.log} />
    </>
  );
};
