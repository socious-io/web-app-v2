import css from './article.module.scss';
import { ArticleProps } from './article.types';
import { Typography } from '../../atoms/typography/typography';

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
