import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Education, otherProfileByUsername, removeEducations, User } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useEducations = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const user = useSelector((state: RootState) => {
    return state.profile.identity;
  }) as User;
  const { educations } = useSelector((state: RootState) => state.linkedin);
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

  const handleDelete = async (id: string) => {
    await removeEducations(id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
  };

  return {
    data: {
      educations,
      openModal,
      educationDetail: education,
    },
    operations: {
      updateSelectedStep,
      setOpenModal,
      handleAdd,
      handleEdit,
      handleDelete,
    },
  };
};
