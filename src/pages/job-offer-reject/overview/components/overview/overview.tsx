import { skillsToCategory, socialCausesToCategory } from 'src/core/adaptors';
import { translateProjectLength } from 'src/constants/PROJECT_LENGTH';
import { translatePaymentType } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { translatePaymentTerms } from 'src/constants/PROJECT_PAYMENT_SCHEME';
import { translatePaymentRange } from 'src/constants/PAYMENT_RANGE';
import { translateProjectType } from 'src/constants/PROJECT_TYPES';
import { CategoriesClickable } from 'src/components/atoms/categories-clickable/categories-clickable';
import { translateExperienceLevel } from 'src/constants/EXPERIENCE_LEVEL';
import { ExpandableText } from 'src/components/atoms/expandable-text';
import { Divider } from 'src/components/templates/divider/divider';
import { OverviewProps } from './overview.types';
import { printWhen } from 'src/core/utils';
import { useNavigate } from '@tanstack/react-location';
import { InfoModal } from 'src/pages/job-edit/info/info-modal';
import { SkillsModal } from 'src/pages/job-edit/skills/skills-modal';
import { SocialCausesModal } from 'src/pages/job-edit/social-causes/social-causes-modal';
import css from './overview.module.scss';
import { useState } from 'react';
import { isTouchDevice } from 'src/core/device-type-detector';

export const Overview = ({ data, questions }: OverviewProps): JSX.Element => {
  const navigate = useNavigate();
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);
  const [openSkillsModal, setOpenSkillsModal] = useState<boolean>(false);
  const [openSocialCausesModal, setOpenSocialCausesModal] = useState<boolean>(false);
  const [overviewData, setOverviewData] = useState(data);

  const paymentRange = (
    <div className={css.group}>
      <div className={css.groupTitle}>
        {
          translatePaymentRange(
            overviewData.payment_range_lower,
            overviewData.payment_range_higher,
            overviewData.payment_type,
            overviewData.payment_scheme
          ).label
        }
      </div>
      <div className={css.value}>
        {
          translatePaymentRange(
            overviewData.payment_range_lower,
            overviewData.payment_range_higher,
            overviewData.payment_type,
            overviewData.payment_scheme
          ).value
        }
      </div>
    </div>
  );

  return (
    <div className={css.container}>
      <Divider
        title="Job description"
        onEdit={() =>
          isTouchDevice() ? navigate({ to: `/jobs/edit/info/${overviewData.id}` }) : setOpenInfoModal(true)
        }
      >
        <div className={css.group}>
          <div className={css.groupTitle}>Job title</div>
          <div>{overviewData.title}</div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Job Category</div>
          <div>{overviewData.job_category?.name}</div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Job description</div>
          <div className={css.value}>
            <ExpandableText text={overviewData.description} isMarkdown />
          </div>
        </div>
        <div className={css.group}>
          <div className={css.groupTitle}>Location</div>
          <div className={css.value}>
            {overviewData.country} {overviewData.city}
          </div>
        </div>
        <div className={css.twoCol}>
          <>
            <div className={css.group}>
              <div className={css.groupTitle}>Job type</div>
              <div className={css.value}>{translateProjectType(overviewData.project_type)}</div>
            </div>
            <div className={css.group}>
              <div className={css.groupTitle}>Job length</div>
              <div className={css.value}>{translateProjectLength(overviewData.project_length)}</div>
            </div>
            <div className={css.group}>
              <div className={css.groupTitle}>Payment type / terms</div>
              <div className={css.value}>
                {translatePaymentType(overviewData.payment_type)} - {translatePaymentTerms(overviewData.payment_scheme)}
              </div>
            </div>
            {printWhen(paymentRange, !!overviewData.payment_range_lower && !!overviewData.payment_range_higher)}
            <div className={css.group}>
              <div className={css.groupTitle}>Experience level</div>
              <div className={css.value}>{translateExperienceLevel(overviewData.experience_level)}</div>
            </div>
          </>
        </div>
      </Divider>
      <Divider
        title="Social causes"
        onEdit={() =>
          isTouchDevice()
            ? navigate({ to: `/jobs/edit/social-causes/${overviewData.id}` })
            : setOpenSocialCausesModal(true)
        }
      >
        <CategoriesClickable list={socialCausesToCategory(overviewData.causes_tags)} />
      </Divider>
      <Divider
        title="Skills"
        onEdit={() =>
          isTouchDevice() ? navigate({ to: `/jobs/edit/skills/${overviewData.id}` }) : setOpenSkillsModal(true)
        }
      >
        <CategoriesClickable list={skillsToCategory(overviewData.skills)} />
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
      <InfoModal
        jobOverview={overviewData}
        open={openInfoModal}
        onClose={() => setOpenInfoModal(false)}
        onDone={(newOverviewData) => setOverviewData({ ...overviewData, ...newOverviewData })}
      />
      <SkillsModal
        jobOverview={overviewData}
        open={openSkillsModal}
        onBack={() => console.log}
        onClose={() => setOpenSkillsModal(false)}
        onDone={(newOverviewData) => setOverviewData({ ...overviewData, ...newOverviewData })}
      />
      <SocialCausesModal
        jobOverview={overviewData}
        open={openSocialCausesModal}
        onClose={() => setOpenSocialCausesModal(false)}
        onDone={(newOverviewData) => setOverviewData({ ...overviewData, ...newOverviewData })}
      />
    </div>
  );
};
