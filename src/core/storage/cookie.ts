function save(items: { [key: string]: string }) {
  Object.entries(items)
    /* 
      '=' make cookies keys unsplitable so we just replace them with '**' and 
      replace it again on fetching values
    */
    .map(([k, v]) => `${k}=${v?.replaceAll('=', '**') || ''}`)
    .map((v) => (document.cookie = v));
}

function keys(): { [key: string]: string } {
  const data: { [key: string]: string } = {};
  const params = document.cookie.split(';');

  for (const p of params) {
    const splited = p.split('=');
    if (splited.length < 2) continue;

    data[splited[0].trim()] = splited[1].trim();
  }
  return data;
}

function add(newItems: { [key: string]: string | undefined }) {
  const items = keys();
  Object.assign(items, newItems);
  save(items);
}

function get(key: string): string | undefined {
  return keys()[key]?.replaceAll('**', '=');
}

function del(key: string): boolean {
  const items = keys();

  if (!items[key]) return false;

  delete items[key];
  save(items);
  return true;
}

function flush() {
  const items = keys();
  Object.entries(items)
    .map(([k]) => `${k}=;expires=Thu, 01 Jan 1970 00:00:00 GMT`)
    .map((v) => (document.cookie = v));
}

export default {
  add,
  get,
  del,
  flush,
};
