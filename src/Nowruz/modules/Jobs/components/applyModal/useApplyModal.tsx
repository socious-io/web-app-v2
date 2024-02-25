import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { Answer, Job, applyJob } from 'src/core/api';
import { QuestionsRes } from 'src/core/types';
import { removedEmptyProps } from 'src/core/utils';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    coverLetter: yup.string().required('Required'),
    linkName: yup.string().test('linkNameRequired', 'Enter link name', function (value) {
      const linkUrl = this.parent.linkUrl;
      if (linkUrl && linkUrl.trim().length > 0) {
        return !!value && value.trim().length > 0;
      }
      return true;
    }),
    linkUrl: yup
      .string()
      .notRequired()
      .matches(
        /^(?!https?:\/\/|ftp:\/\/)[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        { message: 'Enter correct URL!', excludeEmptyString: true },
      ),
  })
  .required();

export const useApplyModal = (handleClose: (applied: boolean) => void) => {
  const { jobDetail, screeningQuestions } = useLoaderData() as {
    jobDetail: Job;
    screeningQuestions: QuestionsRes;
  };

  const [attachments, setAttachments] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [questionErrors, setQuestionErrors] = useState<{ id: string; message: string }[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const apply = async () => {
    const errors: { id: string; message: string }[] = [];
    screeningQuestions.questions.forEach((q) => {
      if (q.required && !answers.find((a) => a.id === q.id)) {
        errors.push({ id: q.id, message: 'Required' });
      }
    });
    setQuestionErrors(errors);
    if (errors.length) return;

    const { coverLetter, linkName, linkUrl } = getValues();
    let payload = {
      cover_letter: coverLetter,
      cv_link: linkUrl ? 'https://' + linkUrl : '',
      cv_name: linkName,
      share_contact_info: true,
      attachment: attachments[0],
      answers: answers,
    };

    payload = removedEmptyProps(payload);

    await applyJob(jobDetail.id, payload);
    handleClose(true);
  };

  return {
    register,
    handleSubmit,
    errors,
    setAttachments,
    answers,
    setAnswers,
    questionErrors,
    setQuestionErrors,
    apply,
    screeningQuestions,
  };
};
