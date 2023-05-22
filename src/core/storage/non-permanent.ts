import { Capacitor } from '@capacitor/core';
import { Preferences, SetOptions } from '@capacitor/preferences';
import Cookies from 'js-cookie';

const isNative = Capacitor.isNativePlatform();

function removeCookiesFromAllPaths() {
  document.cookie.replace(/(?<=^|;).+?(?=\=|;|$)/g, (name) =>
    location.hostname
      .split('.')
      .reverse()
      .reduce(
        (domain) => (
          (domain = domain.replace(/^\.?[^.]+/, '')),
          (document.cookie = `${name}=;max-age=0;path=/;domain=${domain}`),
          domain
        ),
        location.hostname
      )
  );
}

async function set(payload: SetOptions): Promise<void> {
  if (isNative) {
    await Preferences.set(payload);
  } else {
    Cookies.set(payload.key, payload.value, { sameSite: 'Strict', secure: true });
  }
}

async function get(key: string) {
  if (isNative) {
    return Preferences.get({ key }).then(({ value }) => value);
  } else {
    return Cookies.get(key);
  }
}

async function clear() {
  if (isNative) {
    return Preferences.clear();
  } else {
    removeCookiesFromAllPaths();
  }
}

export const nonPermanentStorage = { set, get, clear };
