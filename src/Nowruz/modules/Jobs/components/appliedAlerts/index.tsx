import { Typography } from '@mui/material';
import { FeaturedIconOutlined } from 'src/Nowruz/modules/general/components/featuredIconOutlined';

import css from './applyAlerts.module.scss';

export const AppliedAlerts = () => {
  return (
    <div className="w-full flex flex-col gap-5 md:gap-8">
      <div className={css.section1}>
        <FeaturedIconOutlined iconName="check-circle" size="md" theme="primary" />
        <Typography variant="subtitle2" className="text-Brand-700">
          You application has been successfully submitted
        </Typography>
      </div>
      <div className={css.section2}>
        <FeaturedIconOutlined iconName="info-circle" size="md" theme="gray" />
        <Typography variant="subtitle2" className="text-Gray-light-mode-700">
          You have applied for this job
        </Typography>
      </div>
    </div>
  );
};
