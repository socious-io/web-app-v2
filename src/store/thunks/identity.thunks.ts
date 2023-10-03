import { createAsyncThunk } from '@reduxjs/toolkit';
import { identities } from 'src/core/api';

export const currentIdentities = createAsyncThunk('identity/currentIdentities', identities);
