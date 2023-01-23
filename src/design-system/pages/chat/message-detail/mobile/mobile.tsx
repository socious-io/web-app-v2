import { ChatList } from '../../../../organisms/chat-list/chat-list';
import { Header } from './header/header';
import css from './mobile.module.scss';

const DATA = [
  {
    img: '',
    type: 'sender',
    text: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Aut numquam illo laborum eius inventore et, eligendi fuga suscipit nisi fugit voluptates, praesentium voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'receiver',
    text: ' voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'sender',
    text: 'orem ipsum dolor sit amet, consectetur adipisicing elit. Aut numquam illo laborum eius inventore et, eligendi fuga suscipit nisi fugit voluptates, praesentium voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
  {
    img: '',
    type: 'receiver',
    text: ' voluptatum adipisci incidunt amet consectetur iusto. Iure, id',
  },
];
export const Mobile = (): JSX.Element => {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <Header type={'users'} name={'name'} lastOnline={'2 months ago'} />
      </div>
      <div className={css.main}>
        <ChatList list={[...DATA, ...DATA]} />
      </div>
      <div>SENDING....</div>
    </div>
  );
};
