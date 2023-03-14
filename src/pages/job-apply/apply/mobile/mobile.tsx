import css from './mobile.module.scss';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { ChangeEvent, useState } from 'react';
import { QuestionsRes } from '../../../../core/types';
import { Textarea } from '../../../../components/atoms/textarea/textarea';
import { ProfileView } from '../../../../components/molecules/profile-view/profile-view';
import { Job } from '../../../../components/organisms/job-list/job-list.types';
import { resumeInitialState, createRadioQuestion, createTextQuestion, submit, applyApplication } from '../apply.services';
import { Resume } from '../apply.types';
import { Divider } from '../../../../components/templates/divider/divider';
import { Input } from '../../../../components/atoms/input/input';
import { Typography } from '../../../../components/atoms/typography/typography';
import { Button } from '../../../../components/atoms/button/button';
import { Checkbox } from '../../../../components/atoms/checkbox/checkbox';
import { Header } from '../../../../components/atoms/header/header';
import { printWhen } from '../../../../core/utils';
import { useForm } from '../../../../core/form';
import { formModel } from '../apply.form';
import { getFormValues } from '../../../../core/form/customValidators/formValues';
import { dialog } from '../../../../core/dialog/dialog';

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const form = useForm(formModel);
  const [resume, setResume] = useState<Resume>(resumeInitialState);
  const { jobDetail, screeningQuestions } = useMatch().ownData as {
    jobDetail: Job;
    screeningQuestions: { questions: QuestionsRes[] };
  };
  const questions = screeningQuestions.questions;

  function onResumeLoad(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    const fileSizeMB = files![0].size / 1048576;
    if (files && fileSizeMB > 10) {
      dialog.alert({ title: 'Error', message: 'File cannot be over 10MB' });
      return;
    }
    if (!files || files.length === 0) {
      return;
    }
    setResume({ name: files[0].name, file: files[0] });
  }

  function navigateToJobDetail() {
    navigate({ to: '..' });
  }

  function onSubmit() {
    const payload = getFormValues(form);
    if (resume.file) {
      submit(jobDetail.id, resume.file, payload).then(navigateToJobDetail);
    } else {
      applyApplication(jobDetail.id, payload).then(navigateToJobDetail);
    }
  }

  const renderQuestions = () => {
    return (
      <div className={css.questionsContainer}>
        <Divider divider="line" title="Screening questions">
          {questions.map((item, i) => {
            const isMultipleChoice = item.options;
            return (
              <div key={item.id} className={css.questions}>
                {isMultipleChoice ? createRadioQuestion(item, i + 1) : createTextQuestion(item, i + 1)}
              </div>
            );
          })}
        </Divider>
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
      <Button position="relative" icon="/icons/attachment.svg" width="9.75rem" size="s" color="white">
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
            location={`${jobDetail.identity_meta.city}, ${jobDetail.identity_meta.country}`}
          />
          <div className={css.jobTitle}>{jobDetail.title}</div>
          <Typography lineLimit={3}>{jobDetail.description}</Typography>
        </Divider>
        <Divider divider="line" title="Cover letter">
          <Textarea register={form} name="cover_letter" placeholder="write a message..." label="Message" />
        </Divider>
        <Divider divider="line" title="Resume">
          {resume.name ? uploadedResume : uploadResumeBtn}
        </Divider>
        <Divider divider="line" title="Link">
          <div className={css.linkContainer}>
            <Input register={form} name="cv_name" optional placeholder="Link name" label="Link name" />
            <Input register={form} name="cv_link" optional placeholder="domain.com" label="Link URL" />
          </div>
        </Divider>
        {printWhen(renderQuestions(), !!questions.length)}
        <Divider divider="line" title="Contact info">
          <div className={css.contactContainer}>
            <div>Share contact information with Organization?</div>
            <Checkbox label="" id="" defaultChecked={false} />
          </div>
        </Divider>
        <div className={css.btnContainer}>
          <Button disabled={!form.isValid} onClick={onSubmit}>
            Submit application
          </Button>
        </div>
      </div>
    </div>
  );
};
