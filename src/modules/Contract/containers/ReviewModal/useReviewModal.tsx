import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Contract } from 'src/core/adaptors';
import { contestMission, feedbackMission } from 'src/core/api';
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (formData: Form) => {
    console.log('submit', formData.content);
    // try {
    //   if (selectedValue === 'satisfactory') await feedbackMission(offer.mission.id, content);
    //   else await contestMission(offer.mission.id, content);
    //   await dispatch(updateFeedback({ id: offer.id, orgFeedback: { mission_id: offer.mission.id } }));
    //   closeReviewModal()
    //   setOpenSuccessModal(true);
    // } catch (error) {
    //   console.log('Error in submitting feedback');
    // }
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
