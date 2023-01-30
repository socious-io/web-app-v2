import { socialCausesToCategory } from '../../../../../core/adaptors';
import { useState } from 'react';
import { Comment } from '../../../../molecules/comment/comment';
import { FeedItem } from '../../../../molecules/feed-item/feed-item';
import { SendBox } from '../../../../molecules/send-box/send-box';
import css from './mobile.module.scss';
import { addComment, getComments } from './mobile.service';
import { CommentModel } from './mobile.types';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Feed } from '../../../../organisms/feed-list/feed-list.types';
import { Pagination } from '../../../../../core/types';
import { Header } from '../../../../atoms/header/header';


export const Mobile = () => {
    const resolver = useMatch();
    const navigate = useNavigate();
    const { post, comments } = resolver.ownData as {
        post: Feed;
        comments: Pagination<CommentModel[]>;
    };
    const [message, setMessage] = useState('');
    const [commentList, setCommentList] = useState<CommentModel[]>(comments.items);
    const [page, setPage] = useState(1);

    const actionList = (likes: number, liked: boolean) => [
        { label: 'Like', iconName: 'heart-blue', like: likes, isLiked: liked },
        { label: 'Comment', iconName: 'comment-blue' },
    ];

    const changeMessageHandler = (value: string) => {
        setMessage(value);
    };

    const sendMessage = () => {
        addComment(message, post.id).then(() => {
            getComments(post.id, 1).then((resp) => {
                setCommentList(resp.items);
                setMessage('');
            })
        });
    };

    function onMorePage() {
        getComments(post.id, page + 1).then((resp) => {
            setPage((v) => v + 1);
            console.log('resp ==>', resp);
            setCommentList((list) => [...list, ...resp.items]);
        });
    }

    return (
        <div className={css.container}>
            <div className={css.header}>
                <Header onBack={() => navigate({ to: '/feeds' })} title='Post' />
            </div>
            <FeedItem
                key={post.id}
                type={post.identity_type}
                img={post.media != null && post.media.length > 0 ? post.media[0]?.url : ''}
                imgAvatar={post.identity_meta.avatar}
                text={post.content}
                name={post.identity_meta.name}
                actionList={actionList(post.likes, post.liked)}
                date={post.created_at}
                categories={socialCausesToCategory(post.causes_tags)}
            />
            <div className={css.sendBox}>
                <SendBox onValueChange={changeMessageHandler} onSend={sendMessage} value={message} />
            </div>
            <div className={css.messages}>
                <Comment list={commentList} onMorePageClick={onMorePage} />
            </div>
        </div>
    );
};
