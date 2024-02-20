import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSelector } from 'react-redux';
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
export const useReviewModal = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const cardOptionList: CardRadioButtonItem[] = [
        {
            title: '👍  Satisfactory',
            value: 'satisfactory',
        },
        {
            title: '👎  Unsatisfactory',
            value: 'unsatisfactory',
        },
    ];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });


    const selectedOfferId = useSelector<RootState, string | undefined>((state) => {
        return state.contracts.selectedOfferId;
    });

    const mission = useSelector<RootState, Mission | undefined>((state) => {
        return state.contracts.missions.find((item) => item.offer.id === selectedOfferId);
    });


    const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
        if (selectedValue === 'satisfactory') {
            feedbackMission(mission.id, content);
        } else {
            contestMission(mission.id, content);
        }
    };

    return { register, handleSubmit, errors, onSubmit, selectedValue, setSelectedValue, cardOptionList };
};