import Rating from '@mui/material/Rating';
import React from 'react';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { Icon } from 'src/modules/general/components/Icon';

import css from './service-intro.module.scss';
import { ServiceIntroProps } from './ServiceIntro.types';

const ServiceIntro: React.FC<ServiceIntroProps> = ({ review, position, name, avatar }) => {
  return (
    <div className={css.review}>
      <Rating value={5} readOnly icon={<Icon name="star-filled" className="mr-1 text-Warning-300" />} />
      <div className={css.reviewText}>{review}</div>
      <Avatar type="users" img={avatar} />
      <div className={css.name}>{name}</div>
      <div className={css.position}>{position}</div>
    </div>
  );
};

export default ServiceIntro;
