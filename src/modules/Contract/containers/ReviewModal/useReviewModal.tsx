import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Contract, feedbackContractAdaptor } from 'src/core/adaptors';
import { updateFeedback } from 'src/store/reducers/contracts.reducer';
import * as yup from 'yup';

import { Form } from './index.types';

const schema = yup.object().shape({
  content: yup.string().required('Content is required'),
});

export const useReviewModal = (closeReviewModal: () => void, contract: Contract) => {
  const dispatch = useDispatch();
  const partnerName = contract.partner?.meta.name || '';
  const [selectedReviewValue, setSelectedReviewValue] = useState('satisfactory');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const isSatisfied = selectedReviewValue === 'satisfactory';
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (formData: Form) => {
    const { error, data } = await feedbackContractAdaptor(contract.id, formData.content, isSatisfied);
    if (error) return;
    else if (data) {
      dispatch(updateFeedback({ id: contract.id, feedback: true }));
      closeReviewModal();
      setOpenSuccessModal(true);
    }
  };

  return {
    data: {
      selectedReviewValue,
      register,
      errors,
      partnerName,
      openSuccessModal,
    },
    operations: {
      setSelectedReviewValue,
      handleSubmit,
      onSubmit,
      setOpenSuccessModal,
    },
  };
};
