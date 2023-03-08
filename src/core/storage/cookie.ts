function save(items: { [key: string]: string }) {
  Object.entries(items)
    .map(([k, v]) => `${k}=${v || ''}`)
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
  return keys()[key];
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
    .map(([k]) => `${k}=`)
    .map((v) => (document.cookie = v));
}

export default {
  add,
  get,
  del,
  flush,
};
