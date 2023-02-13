import { skillsToCategory, socialCausesToCategory } from '../../../../core/adaptors';
import { translateProjectLength } from '../../../../core/constants/PROJECT_LENGTH';
import { translatePaymentType } from '../../../../core/constants/PROJECT_PAYMENT_TYPE';
import { translateProjectType } from '../../../../core/constants/PROJECT_TYPES';
import { printWhen } from '../../../../utils/utils';
import { CategoriesClickable } from '../../../atoms/categories-clickable/categories-clickable';
import { Divider } from '../../../templates/divider/divider';
import css from './overview.module.scss';
import { OverviewProps } from './overview.types';

export const Overview = ({ data, questions }: OverviewProps): JSX.Element => {
  const paymentRange = (
    <div className={css.group}>
      <div className={css.groupTitle}>Payment range</div>
      <div
        className={css.value}
      >{`$${data.payment_range_lower} ~ $${data.payment_range_higher}`}</div>
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
          <div className={css.groupTitle}>Job description</div>
          <div className={css.value}>{data.description}</div>
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
              <div className={css.value}>{data.experience_level}</div>
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
