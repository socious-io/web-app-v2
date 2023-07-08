import { ChangeEvent, useMemo, useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Resume } from './apply.types';
import { applyApplication, generatePayload, resumeInitialState, submit } from './apply.services';
import { Job } from 'src/components/organisms/job-list/job-list.types';
import { QuestionsRes, UserType } from 'src/core/types';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { generateFormModel } from './apply.form';
import { useForm } from 'src/core/form';
import { dialog } from 'src/core/dialog/dialog';
import { COUNTRIES_DICT } from 'src/constants/COUNTRIES';

type useApplySharedProps = {
  job: Job;
  screeningQuestions: QuestionsRes['questions'];
  location: string;
  userType: UserType;
};

export const useApplyShared = (data?: useApplySharedProps) => {
  const navigate = useNavigate();
  const [resume, setResume] = useState<Resume>(resumeInitialState);
  //   const { jobDetail, screeningQuestions } = useMatch().ownData as {
  //     jobDetail: Job;
  //     screeningQuestions: QuestionsRes['questions'];
  //   };

  const resolver = useMatch().ownData;

  const jobDetail = (data?.job || resolver.jobDetail) as Job;
  const questions = (data?.screeningQuestions || resolver.screeningQuestions) as QuestionsRes['questions'];

  const formModel: FormModel = useMemo(() => generateFormModel(questions), []);
  const form = useForm(formModel);

  function getCountryName(shortname?: keyof typeof COUNTRIES_DICT | undefined) {
    if (shortname && COUNTRIES_DICT[shortname]) {
      return COUNTRIES_DICT[shortname];
    } else {
      return shortname;
    }
  }

  const location = `${jobDetail.identity_meta.city}, ${getCountryName(
    jobDetail.identity_meta.country as keyof typeof COUNTRIES_DICT | undefined
  )}`;

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
    const generatedPayload = generatePayload(form);
    if (resume.file) {
      submit(jobDetail.id, resume.file, generatedPayload).then(navigateToJobDetail);
    } else {
      applyApplication(jobDetail.id, generatedPayload).then(navigateToJobDetail);
    }
  }

  return { questions, resume, setResume, onResumeLoad, jobDetail, form, onSubmit, location };
};
