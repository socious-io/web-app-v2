import { SetOptions } from '@capacitor/preferences';

function parse(cookie: string = document.cookie): Record<string, string> {
  const splitted = cookie.split(';').map((item) => item.split('='));
  if (splitted.length === 0) {
    return {};
  }
  return splitted.reduce((obj, [key, value]) => {
    Object.assign(obj, { [key.trim()]: value });
    return obj;
  }, {});
}

function set({ key, value }: SetOptions): Record<string, string> {
  const clone = { ...parse() };
  Object.assign(clone, { [key]: value });
  Object.entries(clone).reduce((prev, [key, value]) => {
    const p = `${key}=${value};`;
    prev = `${prev}${p}`;
    return prev;
  }, '');
  return clone;
}

function getAll() {
  return parse();
}

function get(key: string) {
  const parsedCookie = parse();
  if (key in parsedCookie) {
    return parsedCookie[key];
  } else {
    console.warn(`Could not find ${key} in the cookies`);
    return '';
  }
}

export const cookies = { set, get, getAll };
