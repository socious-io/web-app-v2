import { AlertOptions, Dialog } from '@capacitor/dialog';

export const dialog = {
  alert: async (options: AlertOptions) => {
    return Dialog.alert(options);
  },
  confirm: async (options: AlertOptions) => {
    return Dialog.confirm(options);
  },
  prompt: async (options: AlertOptions) => {
    return Dialog.prompt(options);
  },
};
