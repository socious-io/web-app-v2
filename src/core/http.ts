import axios, { AxiosRequestConfig } from 'axios';
import { hideSpinner, showSpinner } from '../store/reducers/spinner.reducer';
import store from '../store/store';

const http = axios.create({
  baseURL: 'https://dev.socious.io/api/v2',
  withCredentials: true,
  timeout: 100000,
});

export async function post(uri: string, payload: unknown, config?: AxiosRequestConfig<unknown>) {
  return http.post(uri, payload, config);
}

export async function get(uri: string) {
  return http.get(uri);
}

http.interceptors.request.use(
  function (config) {
    store.dispatch(showSpinner());
    // Do something before request is sent
    return config;
  },
  function (error) {
    store.dispatch(hideSpinner());
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    store.dispatch(hideSpinner());
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    store.dispatch(hideSpinner());
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
