import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User, identities } from 'src/core/api';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { updateUserProfile } from 'src/store/thunks/profile.thunks';

export const useEditSummary = (handleClose: () => void) => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const dispatch = useDispatch();
  const [summary, setSummary] = useState(user?.mission);
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(user?.mission?.length);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setError('required');
      setLetterCount(0);
      setSummary(value);
    } else if (value.length < 2600) {
      setSummary(value);
      setError('');
      setLetterCount(value.length);
    } else setError('Too long');
  };

  const closeModal = () => {
    setSummary(user?.mission);
    setError('');
    setLetterCount(user?.mission?.length);
    handleClose();
  };

  const onSave = async () => {
    if (error) return;
    const updatedUser = {
      ...user,
      mission: summary,
    };
    await store.dispatch(updateUserProfile(updatedUser as User));
    const resp = await identities();
    dispatch(setIdentityList(resp));
    closeModal();
  };
  return { summary, error, handleChange, letterCount, closeModal, onSave };
};
