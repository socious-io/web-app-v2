import { ActionList } from 'src/components/atoms/action-list/action-list';
import { Avatar } from 'src/components/atoms/avatar/avatar';
import { Card } from 'src/components/atoms/card/card';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Typography } from 'src/components/atoms/typography/typography';
import { toRelativeTime } from 'src/core/relative-time';
import { useAuth } from 'src/hooks/use-auth';

import css from './feed-item.module.scss';
import { FeedItemProps } from './feed-item.types';

export const FeedItem = (props: FeedItemProps): JSX.Element => {
  const { type, actionList, date, lineLimit = 3, img, name, imgAvatar } = props;
  const { showIfLoggedIn } = useAuth();

  const threeDotMenu = (
    <div className={css.icon} onClick={props.onMoreClick}>
      <img src="/icons/three-dots-blue.svg" alt="" />
    </div>
  );

  return (
    <Card>
      <div className={css.header}>
        <div className={css.info}>
          <Avatar onClick={console.log} type={type} size="2rem" img={imgAvatar} />
          <span>{name}</span>
          <span className={css.date}>{toRelativeTime(date)}</span>
        </div>
        {showIfLoggedIn(threeDotMenu)}
      </div>
      <div className={css.img}>
        <img src={img} alt="" />
      </div>
      <CategoriesClickable list={props.categories} />
      <div className={css.text}>
        <Typography type="body" lineLimit={lineLimit} size="s2">
          {props.text && <ExpandableText text={props.text} />}
        </Typography>
      </div>
      <div>{showIfLoggedIn(<ActionList list={actionList} />)}</div>
    </Card>
  );
};
