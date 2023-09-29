import css from './mobile.module.scss';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { getCountryByShortname } from 'src/constants/COUNTRIES';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { getCausesList } from 'src/components/organisms/job-list/job-list.services';
import { useReviewShared } from '../review.shared';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { CategoriesResp } from 'src/core/types';
import { Button } from 'src/components/atoms/button/button';

export const Mobile: React.FC = () => {
  const { formState, questions } = useReviewShared();
  const categories = useMatch().ownData.categories as CategoriesResp['categories'];
  const getJobCategory = () => {
    const category = categories.find((item) => item.id === formState.job_category_id);
    return category?.name;
  };
  const resolver = useMatch();

  const navigate = useNavigate();

  function submit() {
    navigate({ to: `/m/jobs/created/${questions.question_project_id.identity_id}` });
  }

  function saveDraft() {
    console.log('save draft');
  }

  return (
    <div className={css.container}>
      <div className={css.header}>
        <div className={css.chevron} onClick={() => navigate({ to: `/jobs/create/screener-questions` })}>
          <img height={24} src="/icons/chevron-left.svg" />
        </div>
        <div className={css.headerTitle}>Create job</div>
      </div>
      <div className={css.main}>
        <div className={css.reviewSection}>
          <div className={css.title}>Job info</div>
          <div className={css.edit}>
            <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" />
          </div>
        </div>
        <div className={css.info}>
          <div className={css.title}>Job title</div>
          <div className={css.content}>{formState.title}</div>
        </div>
        <div className={css.info}>
          <div className={css.title}>Job description</div>
          <div className={css.content}>
            <ExpandableText text={formState.description} isMarkdown />
          </div>
        </div>
        <div className={css.info__twoCol}>
          <div>
            <div className={css.title}>Location</div>
            <div className={css.content}>
              {translateRemotePreferences(formState.remote_preference)
                ? translateRemotePreferences(formState.remote_preference)
                : getCountryByShortname(formState.country as any) + formState.city}
            </div>
          </div>
          <div>
            <div className={css.title}>Job type</div>
            <div className={css.content}>{translateProjectType(formState.project_type)}</div>
          </div>
          <div>
            <div className={css.title}>Job Category</div>
            <div className={css.content}>{getJobCategory()}</div>
          </div>
          <div>
            <div className={css.title}>Job Length</div>
            <div className={css.content}>{translateProjectLength(formState.project_length)}</div>
          </div>
          <div>
            <div className={css.title}>Payment type/terms</div>
            <div className={css.content}>
              {translatePaymentType(formState.payment_type)} - {String(formState.payment_scheme).toLowerCase()}
            </div>
          </div>
          <div>
            <div className={css.title}>Payment Range</div>
            <div className={css.content}>
              ${formState.payment_range_lower} - ${formState.payment_range_higher} / hr
            </div>
          </div>
          <div>
            <div className={css.title}>Experience level</div>
            <div className={css.content}>{translateExperienceLevel(formState.experience_level)}</div>
          </div>
        </div>
        <div className={css.reviewSectionList}>
          <div className={css.title}>Social cause</div>
          <div className={css.edit}>
            <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" />
          </div>
        </div>
        <div className={css.list}>
          {getCausesList(formState.causes_tags).map((cause) => (
            <span key={cause}>{cause}</span>
          ))}
        </div>
        <div className={css.reviewSectionList}>
          <div className={css.title}>Skills</div>
          <div className={css.edit}>
            <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" />
          </div>
        </div>
        <div className={css.list}>
          {getCausesList(formState.skills).map((cause) => (
            <span key={cause}>{cause}</span>
          ))}
        </div>
        <div className={css.reviewSectionList}>
          <div className={css.title}>Screening questions</div>
          <div className={css.edit}>
            <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" />
          </div>
        </div>
        <div className={css.list}>
          <ul className={css.questions}>
            {questions.created_questions.map((q) => {
              return (
                <li key={q.id} className={css.questionItem}>
                  {q.question}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={css.btnContainer}>
        <Button color="blue" onClick={submit}>
          Create
        </Button>
        <Button color="white" onClick={saveDraft}>
          Save draft
        </Button>
      </div>
    </div>
  );
};
