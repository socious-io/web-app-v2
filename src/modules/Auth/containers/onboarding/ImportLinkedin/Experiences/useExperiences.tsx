import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Experience } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';
import { setLinkedIn } from 'src/store/reducers/linkedin.reducer';

export const useExperiences = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const linkedin = useSelector((state: RootState) => state.linkedin);
  const [experiencesList, setExperiencesList] = useState(linkedin.experiences || []);
  const [openModal, setOpenModal] = useState(false);
  const [experience, setExperience] = useState<Experience>();

  const handleEdit = (ex: Experience) => {
    setExperience(ex);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setExperience(undefined);
    setOpenModal(true);
  };

  const onAddExperience = (experience: Experience, isEdit: boolean) => {
    if (isEdit) {
      const editedExperiences = experiencesList.map(list => (list.id === experience.id ? experience : list));
      setExperiencesList(editedExperiences);
    } else {
      setExperiencesList([...experiencesList, experience]);
    }
  };

  const handleDelete = async (deletedId: string) => {
    const filteredList = experiencesList.filter(experience => experience.id !== deletedId);
    setExperiencesList(filteredList);
  };

  const onNextStep = async () => {
    dispatch(setLinkedIn({ ...linkedin, experiences: experiencesList }));
    updateSelectedStep(3);
  };

  return {
    data: {
      experiences: experiencesList,
      openModal,
      experienceDetail: experience,
    },
    operations: {
      setOpenModal,
      handleAdd,
      onAddExperience,
      handleEdit,
      handleDelete,
      onNextStep,
    },
  };
};
