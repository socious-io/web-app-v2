import { Button } from '../../atoms/button/button';
import { CategoriesClickable } from '../../atoms/categories-clickable/categories-clickable';
import { Categories } from '../../atoms/categories/categories';
import { Header } from '../../atoms/header/header';
import { ProfileView } from '../../molecules/profile-view/profile-view';
import { LineDivider } from '../../templates/line-divider/line-divider';
import css from './job-detail.module.scss';
import { JobDetailProps } from './job-detail.types';

export const JobDetail = (props: JobDetailProps): JSX.Element => {
  return (
    <div className={css.container}>
      <Header title="Full Stack Developer" />
      <LineDivider>
        <ProfileView
          name="Ocean Protection"
          location="Helsinki, Finland"
          type="organization"
        />
        <div className={css.jobTitle}>Full Stack Developer</div>
        <Categories
          marginBottom="1rem"
          list={[
            'remote',
            'part-time',
            'remote',
            'part-time',
            'remote',
            'part-time',
            'remote',
            'part-time',
          ]}
        />
        <Button>Apply now</Button>
      </LineDivider>
      <LineDivider title="Social cause">
        <CategoriesClickable
          list={['Climate Change', 'Climate Change2', 'Climate Change3']}
        />
      </LineDivider>
      <LineDivider title="Job description">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi sunt,
        alias neque eaque debitis omnis vel quidem facilis animi delectus
        repudiandae praesentium incidunt nisi, nostrum odio ullam libero numquam
        exercitationem?
      </LineDivider>
      <LineDivider title="Skills">
        <CategoriesClickable
          list={['Climate Change', 'Climate Change2', 'Climate Change3']}
        />
      </LineDivider>
    </div>
  );
};
