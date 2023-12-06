import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { User, identities } from 'src/core/api';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile } from 'src/store/thunks/profile.thunks';

export const useEditSkills = (handleClose: () => void) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const [skills, setSkills] = useState<{ value: string; label: string }[]>([]);
  const [skillItems, setSkillItems] = useState<{ value: string; label: string }[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const getOptionsFromValues = (values: string[], options: { value: string; label: string }[]) =>
    options.filter((option) => values.includes(option.value));

  const resetStates = async () => {
    setSkills(getOptionsFromValues(user?.skills || [], skillItems));
    setErrors([]);
  };

  useEffect(() => {
    setSkills(getOptionsFromValues(user?.skills || [], skillItems));
  }, [user, skillItems]);

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => setSkillItems(data));
  }, []);

  const closeModal = async () => {
    await resetStates();
    handleClose();
  };

  const onSave = async () => {
    if (!skills.length) {
      setErrors(['Required']);
      return;
    }
    const updatedUser = {
      ...user,
      skills: skills.map((item) => item.value),
    };
    await store.dispatch(updateUserProfile(updatedUser as User));
    const res = await identities();
    await dispatch(setIdentityList(res));
    handleClose();
  };

  return { skills, skillItems, setSkills, errors, onSave, closeModal };
};
