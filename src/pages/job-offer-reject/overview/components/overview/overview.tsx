import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Divider } from 'src/components/templates/divider/divider';
import { OverviewProps } from './overview.types';
import { printWhen } from 'src/core/utils';
import css from './overview.module.scss';

export const Overview = ({ data, questions }: OverviewProps): JSX.Element => {
  const label = `${data.payment_type}-${data.payment_scheme}`;
  const rangeLabel: Record<string, string> = {
    'PAID-FIXED': 'Payment range',
    'PAID-HOURLY': 'Payment range',
    'VOLUNTEER-FIXED': 'Commitment',
    'VOLUNTEER-HOURLY': 'Weekly hours',
  };
  const rangeValue: Record<string, string> = {
    'PAID-FIXED': `$${data.payment_range_lower} ~ $${data.payment_range_higher}`,
    'PAID-HOURLY': `$${data.payment_range_lower} ~ $${data.payment_range_higher} / hr`,
    'VOLUNTEER-FIXED': `${data.payment_range_lower} ~ ${data.payment_range_higher} hrs`,
    'VOLUNTEER-HOURLY': `${data.payment_range_lower} ~ ${data.payment_range_higher} hrs / week`,
  };

  const paymentRange = (
    <div className={css.group}>
      <div className={css.groupTitle}>{rangeLabel[label]}</div>
      <div className={css.value}>{rangeValue[label]}</div>
    </div>
  );

  return (
    <div className={css.container}>
      <Divider title="Job description">
        <div className={css.group}>
          <div className={css.groupTitle}>Job title</div>
          <div>{data.title}</div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Job Category</div>
          <div>{data.job_category?.name}</div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Job description</div>
          <div className={css.value}>
            <ExpandableText text={data.description} isMarkdown />
          </div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Location</div>
          <div className={css.value}>
            {data.country} {data.city}
          </div>
        </div>
        <div className={css.twoCol}>
          <>
            <div className={css.group}>
              <div className={css.groupTitle}>Job type</div>
              <div className={css.value}>{translateProjectType(data.project_type)}</div>
            </div>
            <div className={css.group}>
              <div className={css.groupTitle}>Job length</div>
              <div className={css.value}>{translateProjectLength(data.project_length)}</div>
            </div>
            <div className={css.group}>
              <div className={css.groupTitle}>Payment type</div>
              <div className={css.value}>{translatePaymentType(data.payment_type)}</div>
            </div>
            {printWhen(paymentRange, data.payment_range_higher)}
            <div className={css.group}>
              <div className={css.groupTitle}>Experience level</div>
              <div className={css.value}>{translateExperienceLevel(data.experience_level)}</div>
            </div>
          </>
        </div>
      </Divider>
      <Divider title="Social causes">
        <CategoriesClickable list={socialCausesToCategory(data.causes_tags)} />
      </Divider>
      <Divider title="Skills">
        <CategoriesClickable list={skillsToCategory(data.skills)} />
      </Divider>
      <Divider title="Screening questions">
        <div className={css.screeningQuestionBody}>
          {questions.map((item, i) => (
            <p key={item.id} className={css.questions}>
              {i + 1}. {item.question}
            </p>
          ))}
        </div>
      </Divider>
    </div>
  );
};
