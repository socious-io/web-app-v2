const base = 'https://dev.socious.io/api/v2';

export async function post(uri: string, payload: unknown) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
    body: JSON.stringify(payload),
  };

  return fetch(`${base}/${uri}`, options).then((resp) => resp.json());
}

export async function get(uri: string) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      credentials: 'include',
    },
  };
  return fetch(`${base}/${uri}`, options).then((resp) => resp.json());
}
