import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Experience, otherProfileByUsername, removeExperiences, User } from 'src/core/api';
import { StepsContext } from 'src/modules/Auth/containers/onboarding/Stepper';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';

export const useExperiences = () => {
  const dispatch = useDispatch();
  const { updateSelectedStep } = useContext(StepsContext);
  const user = useSelector((state: RootState) => {
    return state.profile.identity;
  }) as User;
  const { experiences } = useSelector((state: RootState) => state.linkedin);
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

  const handleDelete = async (id: string) => {
    await removeExperiences(id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
  };

  return {
    data: {
      experiences,
      openModal,
      experienceDetail: experience,
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
