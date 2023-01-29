
import { Avatar } from '../../atoms/avatar/avatar';
import { ChatBox } from '../../atoms/chat-box/chat-box';
import css from './comment.module.scss';

export const Comment = () => {
    return (
        <div className={css.container}>
            <div className={css.info}>
                <Avatar type='users' size='2rem' />
                <span className={css.date}>2 min ago</span>
            </div>

            <div className={css.messageBox}>
                <ChatBox type='sender'>
                    ddd
                </ChatBox>
            </div>

            <div className={css.like}>
                <img src="/icons/heart-blue.svg" />
                <span>0 likes</span>
            </div>
        </div>
    )
}