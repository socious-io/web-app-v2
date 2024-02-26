import Rating from '@mui/material/Rating';
import React from 'react';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';

import css from './service-intro.module.scss';
import { ServiceIntroProps } from './ServiceIntro.types';

const ServiceIntro: React.FC<ServiceIntroProps> = ({ review, position, name, avatar }) => {
  return (
    <div className={css.review}>
      <Rating value={5} readOnly icon={<img src="/icons/star.svg" className={css.star} alt="" />} />
      <div className={css.reviewText}>{review}</div>
      <Avatar type="users" img={avatar} />
      <div className={css.name}>{name}</div>
      <div className={css.position}>{position}</div>
    </div>
  );
};

export default ServiceIntro;
