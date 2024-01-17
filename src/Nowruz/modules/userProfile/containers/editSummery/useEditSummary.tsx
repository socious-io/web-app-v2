import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Organization, User, identities } from 'src/core/api';
import store, { RootState } from 'src/store';
import { setIdentityList } from 'src/store/reducers/identity.reducer';
import { setIdentity } from 'src/store/reducers/profile.reducer';
import { updateOrgProfile, updateUserProfile } from 'src/store/thunks/profile.thunks';

export const useEditSummary = (handleClose: () => void, type: 'users' | 'organizations') => {
  const identity = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  });
  const dispatch = useDispatch();
  const [summary, setSummary] = useState(identity?.mission);
  const [error, setError] = useState('');
  const [letterCount, setLetterCount] = useState(identity?.mission?.length);

  useEffect(() => {
    setSummary(identity?.mission);
  }, [identity]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setError('required');
      setLetterCount(0);
      setSummary(value);
    } else if (value.length <= 2600) {
      setSummary(value);
      setError('');
      setLetterCount(value.length);
    } else setError('Too long');
  };

  const closeModal = () => {
    setSummary(identity?.mission);
    setError('');
    setLetterCount(identity?.mission?.length);
    handleClose();
  };

  const onSave = async () => {
    if (error) return;

    const updatedIdentity = {
      ...identity,
      mission: summary,
    };
    await dispatch(setIdentity(updatedIdentity));
    if (type === 'users') await store.dispatch(updateUserProfile(updatedIdentity as User));
    else if (type === 'organizations') await store.dispatch(updateOrgProfile(updatedIdentity as Organization));
    const resp = await identities();
    dispatch(setIdentityList(resp));
    handleClose();
  };
  return { summary, error, handleChange, letterCount, closeModal, onSave };
};
