import axios from 'axios';

const http = axios.create({
  baseURL: 'https://dev.socious.io/api/v2',
  withCredentials: true,
  timeout: 100000,
});

export async function post(uri: string, payload: unknown) {
  return http.post(uri, payload);
}

export async function get(uri: string) {
  return http.get(uri);
}
