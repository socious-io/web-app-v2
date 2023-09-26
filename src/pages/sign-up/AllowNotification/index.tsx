import React from 'react';
import { Button } from 'src/components/atoms/button/button';
import { Card } from 'src/components/atoms/card/card';

import css from './allow-notification.module.scss';

export const AllowNotification: React.FC = () => {
  const navigate = {};
  return (
    <div className={css['container']}>
      <Card className={css['card']}>
        <div className={css['card__header']}></div>
        <div className={css['card__content']}>
          <div className={css['card__bell']}>
            <img className={css.logo} src="/icons/bell.svg" />
          </div>
          <div className={css['card__title']}>Allow notifications</div>
          <div className={css['card__sub-title']}>Stay up to date with messages, recommendations and posts</div>
        </div>
        <div className={css['card__buttons']}>
          <Button color="white" onClick={() => navigate({ to: '/jobs' })}>
            Allow notification
          </Button>
          <Button onClick={() => navigate({ to: '/jobs' })}>I'll do it later</Button>
        </div>
      </Card>
    </div>
  );
};
