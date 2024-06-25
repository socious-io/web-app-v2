import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Dispute, PostMediaUploadRes, respondDispute } from 'src/core/api';
import * as yup from 'yup';

import { Form } from './index.types';

const generateSchema = (step: number) =>
  yup.object().shape({
    message: step === 0 ? yup.string().required('Required') : yup.string(),
    evidences: step === 1 ? yup.array().defined().min(1, 'Required').max(10, 'too many files') : yup.array(),
    confirmInfo: yup.boolean(),
    sharedInfo: yup.boolean(),
  });

export const useRespondDisputeModal = (
  disputeId: string,
  open: boolean,
  handleClose: () => void,
  onSubmitRespond: (newDispute: Dispute) => void,
) => {
  const [files, setFiles] = useState<PostMediaUploadRes[]>([]);
  const [showFiles, setShowFiles] = useState<File[]>([]);
  const [step, setStep] = useState(0);
  const [openSuccessModal, setOpenSuccessModal] = useState<{
    open: boolean;
    disputeId: string;
    respondentName: string;
  }>({ open: false, disputeId: '', respondentName: '' });
  const schema = generateSchema(step);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    reset,
  } = useForm<Form>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const confirmInfo = watch('confirmInfo');
  const sharedInfo = watch('sharedInfo');

  const initializeValues = () => {
    const initialVal = {
      message: '',
      evidences: [],
      confirmInfo: false,
      sharedInfo: false,
    };
    setStep(0);
    reset(initialVal);
  };

  useEffect(() => initializeValues(), [open]);

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

  const handleCheckbox = (target: React.ChangeEvent<HTMLInputElement>['target']) => {
    setValue(target.name as 'confirmInfo' | 'sharedInfo', target.checked);
  };

  const onSubmit = async (formData: Form) => {
    if (step < 2) {
      setStep(prev => prev + 1);
    } else {
      const { message, evidences } = formData || {};
      try {
        const res = await respondDispute({ message, evidences }, disputeId);
        reset();
        setFiles([]);
        setShowFiles([]);
        onSubmitRespond(res);
        handleClose();
        setOpenSuccessModal({ open: true, disputeId, respondentName: res.respondent.meta?.name || '' });
      } catch (e) {
        console.log('error in initiating dispute', e);
      }
    }
  };

  const backToPreviousStep = () => {
    setStep(prev => prev - 1);
  };

  return {
    data: { register, errors, files, showFiles, step, confirmInfo, sharedInfo, openSuccessModal },
    operations: {
      handleUpload,
      handleDeleteUpload,
      setShowFiles,
      handleCheckbox,
      handleSubmit,
      onSubmit,
      setOpenSuccessModal,
      backToPreviousStep,
    },
  };
};
