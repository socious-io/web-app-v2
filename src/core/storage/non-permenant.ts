import { Capacitor } from '@capacitor/core';
import { Preferences, SetOptions } from '@capacitor/preferences';
import { cookies } from './cookies';

const isNative = Capacitor.isNativePlatform();

async function set(payload: SetOptions): Promise<void> {
  if (isNative) {
    await Preferences.set(payload);
  } else {
    cookies.set(payload);
  }
}

async function get(key: string) {
  if (isNative) {
    return Preferences.get({ key });
  } else {
    cookies.get(key);
  }
}

export const storage = { set, get };
