import css from './article.module.scss';
import {Typography} from '@atoms/typography/typography';
import {ArticleProps} from './article.types';

export const Article = (props: ArticleProps): JSX.Element => {
  return (
    <div style={props?.style} className={props?.className}>
      <Typography className={css.header} type="heading" size="l">
        {props.title}
      </Typography>
      <Typography>{props.body}</Typography>
    </div>
  );
};
