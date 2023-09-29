import { useState } from 'react';
import { ReviewModalProps } from './review-modal.types';
import store from 'src/store/store';
import { resetCreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { WebModal } from 'src/components/templates/web-modal';
import css from './review-modal.module.scss';
import { useReviewShared } from '../review.shared';
import { CategoriesResp, CreatePostPayload } from 'src/core/types';
import { useDispatch } from 'react-redux';
import { AlertModal } from 'src/components/organisms/alert-modal';
import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { getCountryByShortname } from 'src/constants/COUNTRIES';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { translatePaymentRange } from 'src/constants/PAYMENT_RANGE';
import { translateRemotePreferences } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { convertSnakeCaseToLowerCase } from 'src/core/stringTransformation';
import { getCausesList } from 'src/components/organisms/job-list/job-list.services';
import { ExpandableText } from 'src/components/atoms/expandable-text';

export const ReviewModal: React.FC<ReviewModalProps> = ({ open, onClose, onDone, onBack, onOpen }) => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  function submitSkip() {
    onClose();
    setOpenAlertModal(true);
  }
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { formState, questions } = useReviewShared();
  function done() {
    store.dispatch(resetCreatePostWizard());
    setOpenAlertModal(false);
    onDone();
    navigate({ to: '/jobs' });
  }
  function submit() {
    onClose();
    setOpenAlertModal(true);
  }
  function saveDraft() {
    console.log('save draft');
  }
  const { categories } = (useMatch().ownData.jobCategories as CategoriesResp) || {};
  const getJobCategory = () => {
    const category = categories.find((item) => item.id === formState.job_category_id);
    return category?.name;
  };
  return (
    <>
      <WebModal
        header="Create job"
        open={open}
        onClose={onClose}
        buttons={[
          {
            children: 'Create',
            onClick: () => submit(),
          },
          {
            children: 'Save Draft',
            color: 'white',
            onClick: () => saveDraft(),
          },
        ]}
      >
        <>
          <div className={css.main}>
            <div className={css.reviewSection}>
              <div className={css.title}>Job info</div>
              <div className={css.edit}>
                <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" onClick={() => console.log} />
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
                <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" onClick={() => console.log} />
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
                <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" onClick={() => console.log} />
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
                <img alt="edit icon" className={css.edit__icon} src="/icons/pen.svg" onClick={() => console.log} />
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
        </>
      </WebModal>
      <AlertModal
        open={openAlertModal}
        onClose={() => {
          setOpenAlertModal(false);
          done();
        }}
        title="Job created"
        subtitle="Your job is posted and now visible for users to apply."
        buttons={[{ children: 'Back to jobs', onClick: done }]}
        contentClassName={css.success}
      />
    </>
  );
};
