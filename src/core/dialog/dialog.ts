import { AlertOptions, ConfirmOptions, Dialog, PromptOptions } from '@capacitor/dialog';

export const dialog = {
  alert: async (options: AlertOptions) => {
    return Dialog.alert(options);
  },
  confirm: async (options: ConfirmOptions) => {
    return Dialog.confirm(options);
  },
  prompt: async (options: PromptOptions) => {
    return Dialog.prompt(options);
  },
};
