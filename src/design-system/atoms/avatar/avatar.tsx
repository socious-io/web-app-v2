import css from './avatar.module.scss';
import { AvatarProps } from './avatar.types';

export const Avatar = (props: AvatarProps): JSX.Element => {
  const { size, type, ...rest } = props;

  const style = { ...rest, width: size, height: size };

  const images: Record<AvatarProps['type'], string> = {
    organization: '/src/assets/icons/organization.svg',
    user: '/src/assets/icons/user.svg',
  };

  return (
    <div style={style} className={css.container}>
      <img src={images[type]} />
    </div>
  );
};
