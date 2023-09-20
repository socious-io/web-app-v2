import css from './twoColumns.module.scss';
import { TwoColumnCursorProps } from './twoColumns.types';
import { useAuth } from 'src/hooks/use-auth';

export const TwoColumns = (props: TwoColumnCursorProps): JSX.Element => {
  const { children, ...rest } = props;
  const { isLoggedIn } = useAuth();

  return (
    <div className={css.container} style={rest}>
      <div className={`${css.boundaries} md:mt-10 md:mr-10 md:mb-0 md:ml-10`}>
        {isLoggedIn && <div className="w-[20rem] hidden md:block">{children[0]}</div>}
        <div className={`w-full ${isLoggedIn && 'max-w-[38.5rem]'} flex flex-col`}>{children[1]}</div>
      </div>
    </div>
  );
};
