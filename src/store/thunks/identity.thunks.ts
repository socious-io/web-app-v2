import { createAsyncThunk } from '@reduxjs/toolkit';
import { identities } from 'src/core/api';
import { setUser } from 'src/core/datadog';

export const currentIdentities = createAsyncThunk('identity/currentIdentities', async () => {
  const currentIdentities = await identities();
  const primary = currentIdentities.find((i) => i.primary);
  // Condition to just make typescript happy
  if (primary) {
    setUser({
      id: primary.id,
      email: primary.meta.email,
      name: primary.meta.name,
    });
  }
  return currentIdentities;
});
