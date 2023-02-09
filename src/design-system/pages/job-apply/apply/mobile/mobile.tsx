import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ChangeEvent, useState } from 'react';
import { QuestionsRes } from '../../../../../core/types';
import { Textarea } from '../../../../atoms/textarea/textarea';
import { ProfileView } from '../../../../molecules/profile-view/profile-view';
import { Job } from '../../../../organisms/job-list/job-list.types';
import { Header } from '../../../achievements/header/header';
import { resumeInitialState, createRadioQuestion, createTextQuestion } from '../apply.services';
import { Resume } from '../apply.types';
import { Divider } from '../../../../templates/divider/divider';
import { Input } from '../../../../atoms/input/input';
import { Typography } from '../../../../atoms/typography/typography';
import { Button } from '../../../../atoms/button/button';
import { Checkbox } from '../../../../atoms/checkbox/checkbox';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume>(resumeInitialState);
  const { jobDetail, screeningQuestions } = useMatch().ownData as {
    jobDetail: Job;
    screeningQuestions: { questions: QuestionsRes[] };
  };
  const questions = screeningQuestions.questions;

  function onResumeLoad(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files || files.length === 0) {
      return;
    }
    setResume({ name: files[0].name, file: files[0] });
  }

  const renderQuestions = () => {
    return (
      <div className={css.questionsContainer}>
        {questions.map((item, i) => {
          const isMultipleChoice = item.options;
          return (
            <div key={item.id} className={css.questions}>
              {isMultipleChoice
                ? createRadioQuestion(item, i + 1)
                : createTextQuestion(item, i + 1)}
            </div>
          );
        })}
      </div>
    );
  };

  const uploadedResume = (
    <div className={css.uploadedResume}>
      <img src="/icons/attachment-black.svg" />
      <div>{resume.name}</div>
      <div onClick={() => setResume(resumeInitialState)} className={css.trashIcon}>
        <img src="/icons/trash-bin.svg" />
      </div>
    </div>
  );

  const uploadResumeBtn = (
    <>
      <div className={css.uploadYourResume}>Upload your resume</div>
      <div className={css.acceptedType}>DOC, DOCX, PDF (10MB)</div>
      <Button
        position="relative"
        icon="/icons/attachment.svg"
        width="9.75rem"
        size="s"
        color="white"
      >
        <input onChange={onResumeLoad} type="file" className={css.fileInput} />
        Upload File
      </Button>
    </>
  );

  return (
    <div className={css.container}>
      <Header onBack={() => navigate({ to: '..' })} height="var(--safe-area)" title="Apply" />
      <div className={css.main}>
        <Divider>
          <ProfileView
            img={jobDetail.identity_meta?.image}
            type={jobDetail.identity_type}
            name={jobDetail.identity_meta.name}
            location={jobDetail.identity_meta.city}
          />
          <div className={css.jobTitle}>{jobDetail.title}</div>
          <Typography lineLimit={3}>{jobDetail.description}</Typography>
        </Divider>
        <Divider divider="line" title="Cover letter">
          <Textarea placeholder="write a message..." label="Message" variant="outline" />
        </Divider>
        <Divider divider="line" title="Resume">
          {resume.name ? uploadedResume : uploadResumeBtn}
        </Divider>
        <Divider divider="line" title="Link">
          <div className={css.linkContainer}>
            <Input variant="outline" placeholder="Link name" label="Link name" />
            <Input placeholder="domain.com" variant="outline" label="Link URL" />
          </div>
        </Divider>
        {questions.length > 0 && (
          <Divider divider="line" title="Screening questions">
            {renderQuestions()}
          </Divider>
        )}
        <Divider divider="line" title="Contact info">
          <div className={css.contactContainer}>
            <div>Share contact information with Organization?</div>
            <Checkbox label="" id="" checked={false} />
          </div>
        </Divider>
        <div className={css.btnContainer}>
          <Button onClick={() => navigate({ to: '' })}>Submit application</Button>
        </div>
      </div>
    </div>
  );
};
