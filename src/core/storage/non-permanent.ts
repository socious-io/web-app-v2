import { Capacitor } from '@capacitor/core';
import { Preferences, SetOptions } from '@capacitor/preferences';
import Cookies from 'js-cookie';

const isNative = Capacitor.isNativePlatform();

async function set(payload: SetOptions): Promise<void> {
  if (isNative) {
    await Preferences.set(payload);
  } else {
    Cookies.set(payload.key, payload.value);
  }
}

async function get(key: string) {
  if (isNative) {
    return Preferences.get({ key }).then(({value}) => value);
  } else {
    return Cookies.get(key);
  }
}

export const nonPermanentStorage = { set, get };
