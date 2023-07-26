import { ConfirmOptions, Dialog } from '@capacitor/dialog';
import { useDispatch } from 'react-redux';
import { AlertConfirm } from 'src/components/molecules/alert-confirm/alert-confirm';
import { isTouchDevice } from 'src/core/device-type-detector';
import { closeModal, openModal } from 'src/store/reducers/modal.reducer';

export const useAlert = () => {
  const dispatch = useDispatch();

  function onClose() {
    dispatch(closeModal());
  }

  const dialog = {
    confirm: async (options: ConfirmOptions, onConfirm: () => void) => {
      if (isTouchDevice()) {
        return Dialog.confirm(options).then((resp) => {
          if (resp) {
            onConfirm();
          }
        });
      } else {
        dispatch(openModal(<AlertConfirm options={options} onConfirm={onConfirm} onClose={onClose} />));
      }
    },
  };

  return {
    confirm: dialog.confirm,
  };
};
