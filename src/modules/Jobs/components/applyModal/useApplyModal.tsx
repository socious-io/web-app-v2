import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoaderData } from 'react-router-dom';
import { Answer, ApplyReq, Job, applyJob, uploadMedia } from 'src/core/api';
import { QuestionsRes } from 'src/core/types';
import { removedEmptyProps } from 'src/core/utils';
import { Files } from 'src/modules/general/components/FileUploader/index.types';
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

  const [attachments, setAttachments] = useState<Files[]>([]);
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

  const onDropFiles = async (newFiles: File[]) => {
    newFiles.forEach(async (file: File) => {
      const res = await uploadMedia(file);
      setAttachments([...attachments, { id: res.id, name: res.filename }]);
    });
  };

  const onDeleteFiles = (deletedId: string) => {
    const filteredFiles = attachments.filter(attachment => attachment.id !== deletedId);
    setAttachments(filteredFiles);
  };

  const apply = async () => {
    const errors: { id: string; message: string }[] = [];
    screeningQuestions.questions.forEach(q => {
      if (q.required && !answers.find(a => a.id === q.id)) {
        errors.push({ id: q.id, message: 'Required' });
      }
    });
    setQuestionErrors(errors);
    if (errors.length) return;

    const { coverLetter, linkName, linkUrl } = getValues();
    let payload: ApplyReq = {
      cover_letter: coverLetter,
      cv_link: linkUrl ? 'https://' + linkUrl : '',
      cv_name: linkName || '',
      share_contact_info: true,
      attachment: attachments[0]?.id || '',
      answers: answers,
    };

    payload = removedEmptyProps(payload) as ApplyReq;

    await applyJob(jobDetail.id, payload);
    handleClose(true);
  };

  return {
    register,
    handleSubmit,
    errors,
    attachments,
    onDropFiles,
    onDeleteFiles,
    answers,
    setAnswers,
    questionErrors,
    setQuestionErrors,
    apply,
    screeningQuestions,
  };
};
