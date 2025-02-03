import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Education } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';
import { setLinkedIn } from 'src/store/reducers/linkedin.reducer';

export const useEducations = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const linkedin = useSelector((state: RootState) => state.linkedin);
  const [educationsList, setEducationsList] = useState(linkedin.educations || []);
  const [openModal, setOpenModal] = useState(false);
  const [education, setEducation] = useState<Education>();

  const handleEdit = (ex: Education) => {
    setEducation(ex);
    setOpenModal(true);
  };

  const handleAdd = () => {
    setEducation(undefined);
    setOpenModal(true);
  };

  const onAddEducation = (education: Education, isEdit: boolean) => {
    if (isEdit) {
      const editedExperiences = educationsList.map(list => (list.id === education.id ? education : list));
      setEducationsList(editedExperiences);
    } else {
      setEducationsList([...educationsList, education]);
    }
  };

  const handleDelete = async (deletedId: string) => {
    const filteredList = educationsList.filter(experience => experience.id !== deletedId);
    setEducationsList(filteredList);
  };

  const onNextStep = async () => {
    dispatch(setLinkedIn({ ...linkedin, educations: educationsList }));
    updateSelectedStep(4);
  };

  return {
    data: {
      educations: educationsList,
      openModal,
      educationDetail: education,
    },
    operations: {
      setOpenModal,
      handleAdd,
      onAddEducation,
      handleEdit,
      handleDelete,
      onNextStep,
    },
  };
};
