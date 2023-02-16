import axios, { AxiosRequestConfig } from 'axios';

const http = axios.create({
  baseURL: process.env.BASE_URL || 'https://dev.socious.io/api/v2',
  withCredentials: true,
  timeout: 100000,
});

export async function post(uri: string, payload: unknown, config?: AxiosRequestConfig<unknown>) {
  return http.post(uri, payload, config);
}

export async function get(uri: string) {
  return http.get(uri);
}
