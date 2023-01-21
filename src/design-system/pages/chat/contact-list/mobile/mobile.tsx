import { Avatar } from '../../../../atoms/avatar/avatar';
import { Fab } from '../../../../atoms/fab/fab';
import { Header } from '../../../../atoms/header/header';
import { ContactList } from '../../../../organisms/contact-list/contact-list';
import { HeaderStaticMobile } from '../../../../templates/header-static-mobile/header-static-mobile';

export const Mobile = (): JSX.Element => {
  return (
    <>
      <HeaderStaticMobile>
        <Header border="0" height="auto" title="Chats" right={<Avatar size="2rem" type="user" />} />
        <ContactList list={[]} onSearch={console.log} />
      </HeaderStaticMobile>
      <Fab onClick={console.log} />
    </>
  );
};
