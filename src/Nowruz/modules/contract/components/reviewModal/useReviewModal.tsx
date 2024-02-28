import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { contestMission, feedbackMission } from 'src/core/api';
import { Mission } from 'src/core/api';
import { CardRadioButtonItem } from 'src/Nowruz/modules/general/components/cardRadioButton/cardRadioButton.types';
import * as yup from 'yup';

type Inputs = {
    content: string;
};
const schema = yup.object().shape({
    content: yup
        .string()
        .required('Content is required'),
});
export const useReviewModal = (handleClose) => {
    const [selectedValue, setSelectedValue] = useState('satisfactory');
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const cardOptionList: CardRadioButtonItem[] = [
        { value: 'satisfactory', title: 'Satisfactory', img: <img src="/icons/thumbs-up.svg" /> },
        { value: 'unsatisfactory', title: 'Unsatisfactory', img: <img src="/icons/thumbs-down.svg" /> },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });

    const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
        return state.identity.entities.find((identity) => identity.current);
      });
    const selectedOfferId = useSelector<RootState, string | undefined>((state) => {
        return state.contracts.selectedOfferId;
    });
    const offer = useSelector<RootState, Offer | undefined>((state) => {
        return state.contracts.offers.find((item) => item.id === selectedOfferId);
    });
    const type = identity?.type;
    const name = type === 'users' ? offer?.offerer.meta.name : offer?.recipient.meta.name;

    const mission = useSelector<RootState, Mission | undefined>((state) => {
        return state.contracts.missions.find((item) => item.offer.id === selectedOfferId);
    });

    const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
        if (selectedValue === 'satisfactory') {
            try {
                await feedbackMission(mission.id, content);
                setOpenSuccessModal(true);
            } catch (error) { console.log('error'); }
            
        } else {
            try {
                await contestMission(mission.id, content);
                setOpenSuccessModal(true);
            } catch (error) { console.log(error); }
        }
    };
    const handleCloseSuccessModal = () => {
        handleClose(true);
        setOpenSuccessModal(false);
    };


    return { register, handleSubmit, errors, onSubmit, selectedValue, setSelectedValue, cardOptionList,name,openSuccessModal,handleCloseSuccessModal };
};