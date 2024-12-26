import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';

export const log = async (message: string) => {
  await FirebaseCrashlytics.log({
    message,
  });
};

export const setEnabled = async () => {
  await FirebaseCrashlytics.setEnabled({
    enabled: true,
  });
};

export const isEnabled = async () => {
  const { enabled } = await FirebaseCrashlytics.isEnabled();
  return enabled;
};
