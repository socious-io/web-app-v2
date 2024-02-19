import { Button } from 'src/Nowruz/modules/general/components/Button';
import { HorizontalTabs } from 'src/Nowruz/modules/general/components/horizontalTabs';

import css from './credentials.module.scss';
import { useCredentials } from './useCredentials';

export const Credentials = () => {
  const { tabs } = useCredentials();


  return (
    <>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.left}>
            <h1 className={css.title}>Credentials</h1>
            <h2 className={css.subtitle}>Here all credentials issued or requested</h2>
          </div>
          <div className={css.hidden}>
            <Button color='primary' startIcon={<img src='/icons/plus.svg' alt='plus' style={{ width: '20px' }}/>}>
              Issue a Credential
            </Button>
          </div>
        </div>
        <HorizontalTabs tabs={tabs} />
        
      </div>
    </>
  );
};
