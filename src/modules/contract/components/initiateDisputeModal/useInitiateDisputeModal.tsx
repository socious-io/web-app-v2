import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PostMediaUploadRes, issueDispute } from 'src/core/api';
import { addDaysToDate, formatDateToCustomUTC } from 'src/core/time';
import * as yup from 'yup';

import { Form } from './index.types';

const generateSchema = (step: number) =>
  yup.object().shape({
    category: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    title: step === 0 ? yup.string().required('Required') : yup.string(),
    description: step === 0 ? yup.string().required('Required') : yup.string(),
    evidences: step === 1 ? yup.array().defined().min(1, 'Required').max(10, 'too many files') : yup.array(),
    confirmInfo: step === 2 ? yup.boolean().oneOf([true], 'Required') : yup.boolean(),
    sharedInfo: step === 2 ? yup.boolean().oneOf([true], 'Required') : yup.boolean(),
  });

export const useInitiateDisputeModal = (
  respondentId: string,
  missionId: string,
  open: boolean,
  handleClose: () => void,
) => {
  const WAIT_TO_RESPOND_DAYS = 3;
  const [files, setFiles] = useState<PostMediaUploadRes[]>([]);
  const [showFiles, setShowFiles] = useState<File[]>([]);
  const [step, setStep] = useState(0);
  const [openSuccessModal, setOpenSuccessModal] = useState<{
    open: boolean;
    disputeId: string;
    respondentName: string;
    respondDate: string;
  }>({ open: false, disputeId: '', respondentName: '', respondDate: '' });
  const schema = generateSchema(step);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const category = watch('category');

  const initializeValues = () => {
    const initialVal = {
      category: { value: '', label: '' },
      title: '',
      description: '',
      evidences: [],
      confirmInfo: false,
      sharedInfo: false,
    };
    setStep(0);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [open]);

  const onSelectCategory = value => {
    setValue('category', value);
  };

  const handleUpload = (uploadedFile: PostMediaUploadRes[]) => {
    clearErrors('evidences');
    setFiles(uploadedFile);
    const uploadedIds = uploadedFile.map(upload => upload.id);
    setValue('evidences', uploadedIds);
  };

  const handleDeleteUpload = (deletedIndex: number) => {
    const filteredFiles = files.filter((_, index) => deletedIndex !== index);
    handleUpload(filteredFiles);
  };

  const onSubmit = async (formData: Form) => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      const { title, description, evidences, category } = formData || {};
      try {
        const { respondent, code, created_at } = await issueDispute({
          category: category.value || '',
          title: title || '',
          description: description || '',
          evidences: evidences || [],
          respondent_id: respondentId,
          mission_id: missionId,
        });
        reset();
        setFiles([]);
        setShowFiles([]);
        handleClose();
        setOpenSuccessModal({
          open: true,
          disputeId: code,
          respondentName: respondent.meta?.name || '',
          respondDate: formatDateToCustomUTC(addDaysToDate(created_at, WAIT_TO_RESPOND_DAYS)),
        });
      } catch (e) {
        console.log('error in initiating dispute', e);
      }
    }
  };

  const backToPreviousStep = () => {
    setStep(prev => prev - 1);
  };

  return {
    data: { register, errors, files, showFiles, step, category, openSuccessModal },
    operations: {
      handleUpload,
      handleDeleteUpload,
      setShowFiles,
      onSelectCategory,
      handleSubmit,
      onSubmit,
      setOpenSuccessModal,
      backToPreviousStep,
    },
  };
};
