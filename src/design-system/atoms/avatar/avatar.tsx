import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { size, type, img, ...rest } = props;

  const images: Record<AvatarProps['type'], string> = {
    organizations: '/icons/organization.svg',
    users: '/icons/user.svg',
  };

  const style = {
    ...rest,
    width: size,
    height: size,
    backgroundImage: `url(${images[type]})`,
  };

  return (
    <div style={style} className={css.container}>
      {img && <img className={css.img} src={img} />}
    </div>
  );
};
