import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { contestMission, CurrentIdentity, feedbackMission, Offer } from 'src/core/api';
import { translate } from 'src/core/utils';
import { CardRadioButtonItem } from 'src/modules/general/components/cardRadioButton/cardRadioButton.types';
import { RootState } from 'src/store';
import { updateFeedback } from 'src/store/reducers/contracts.reducer';
import * as yup from 'yup';

type Inputs = {
  content: string;
};
const schema = yup.object().shape({
  content: yup.string().required('Content is required'),
});
export const useReviewModal = (closeReviewModal: () => void) => {
  const [selectedValue, setSelectedValue] = useState('satisfactory');
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const cardOptionList: CardRadioButtonItem[] = [
    { value: 'satisfactory', title: translate('cont-review-satisfactory'), img: <img src="/icons/thumbs-up.svg" /> },
    {
      value: 'unsatisfactory',
      title: translate('cont-review-unsatisfactory'),
      img: <img src="/icons/thumbs-down.svg" />,
    },
  ];
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const identity = useSelector<RootState, CurrentIdentity | undefined>(state => {
    return state.identity.entities.find(identity => identity.current);
  });
  const selectedOfferId = useSelector<RootState, string | undefined>(state => {
    return state.contracts.selectedOfferId;
  });
  const offer = useSelector<RootState, Offer | undefined>(state => {
    return state.contracts.offers.find(item => item.id === selectedOfferId);
  });
  const type = identity?.type;
  const name = type === 'users' ? offer?.offerer.meta.name : offer?.recipient.meta.name;

  //   const mission = useSelector<RootState, Mission | undefined>((state) => {
  //     return state.contracts.missions.find((item) => item.offer.id === selectedOfferId);
  //   });

  const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
    if (!offer?.mission) return;
    try {
      if (selectedValue === 'satisfactory') await feedbackMission(offer.mission.id, content);
      else await contestMission(offer.mission.id, content);

      await dispatch(updateFeedback({ id: offer.id, orgFeedback: { mission_id: offer.mission.id } }));
      setOpenSuccessModal(true);
    } catch (error) {
      console.log('error');
    }
  };
  const handleCloseSuccessModal = () => {
    closeReviewModal();
    setOpenSuccessModal(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    selectedValue,
    setSelectedValue,
    cardOptionList,
    name,
    openSuccessModal,
    handleCloseSuccessModal,
  };
};
