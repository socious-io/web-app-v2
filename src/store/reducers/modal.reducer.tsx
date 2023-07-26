import { createSlice } from '@reduxjs/toolkit';

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: {
    children: null,
    open: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.children = action.payload;
      state.open = true;
    },
    closeModal: (state, action) => {
      //   state.children = null;
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = modalsSlice.actions;
