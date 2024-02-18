import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { credentials } = useCredentials();
  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.left}>
            <h1 className={css.title}>Credentials</h1>
            <h2 className={css.subtitle}>Here all credentials issued or requested</h2>
          </div>
          <div className={css.right}></div>
        </div>
        <div className="flex flex-col">
          {credentials.map((item) => (
            <div
              tabIndex={0}
              className="flex flex-col gap-5 border border-solid border-Gray-light-mode-200 rounded-default py-5 px-6 cursor-pointer"
            >
              <div className="flex gap-4 ">
                <Avatar size="56px" type={'users'} img={item.avatar?.url} />
                <div className="flex flex-col">
                  <span className="font-semibold text-lg leading-7 text-Gray-light-mode-900">
                    {item.user.first_name} {item.user.last_name}
                  </span>
                  <span className="font-normal text-sm leading-5 text-Gray-light-mode-600">@{item.user.username}</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-lg leading-5 text-Gray-light-mode-900">{item.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
