import { useNavigate } from '@tanstack/react-location';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { Avatar } from '../../../../atoms/avatar/avatar';
import { Fab } from '../../../../atoms/fab/fab';
import { Header } from '../../../../atoms/header/header';
import { ContactItem } from '../../../../molecules/contact-item/contact-item.types';
import { ContactList } from '../../../../organisms/contact-list/contact-list';
import { HeaderStaticMobile } from '../../../../templates/header-static-mobile/header-static-mobile';
import { chatEntityToContactListAdaptor } from '../contact-list.services';

export const Mobile = (): JSX.Element => {
  const chatEntity: ContactItem[] = useSelector<RootState>((state) => {
    return chatEntityToContactListAdaptor(state.chat.entities);
  }) as ContactItem[];
  const navigate = useNavigate();

  return (
    <>
      <HeaderStaticMobile>
        <Header
          border="0"
          height="auto"
          title="Chats"
          right={<Avatar size="2rem" type="users" />}
        />
        <ContactList
          onContactClick={(contact) => navigate({ to: contact.id })}
          list={chatEntity}
          onSearch={console.log}
        />
      </HeaderStaticMobile>
      <Fab onClick={console.log} />
    </>
  );
};
