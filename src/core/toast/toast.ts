import { Toast, ShowOptions } from '@capacitor/toast';

export function toast(options: ShowOptions): Promise<void> {
  return Toast.show(options);
}
