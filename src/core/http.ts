import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { dialog } from './dialog/dialog';
import { hideSpinner, showSpinner } from '../store/reducers/spinner.reducer';
import store from '../store/store';
import { TOKEN } from '../constants/AUTH';
import { Cookie } from './storage';
import translate from '../translations';

export const http = axios.create({
  // baseURL: 'https://dev.socious.io/api/v2',
  baseURL: 'https://socious.io/api/v2',
  withCredentials: true,
  timeout: 1000000,
});

function getAuthHeaders(): { [key: string]: string | undefined } | undefined {
  const token = Cookie.get(TOKEN.access);
  const prefix = Cookie.get(TOKEN.type);

  if (!token || !prefix) return;

  return {
    Authorization: `${prefix} ${token}`,
    'Current-Identity': Cookie.get('identity'),
  };
}

export async function post(uri: string, payload: unknown, config?: AxiosRequestConfig<unknown>) {
  const authHeaders = getAuthHeaders();
  config = config || {};

  if (authHeaders) config.headers = { ...config.headers, ...authHeaders };

  return http.post(uri, payload, config);
}

export async function get(uri: string, config?: AxiosRequestConfig<unknown>) {
  const authHeaders = getAuthHeaders();
  config = config || {};
  if (authHeaders) config.headers = { ...config.headers, ...authHeaders };

  return http.get(uri, config);
}

export type ErrorSection = 'AUTH' | 'FORGET_PASSWORD';

export type ErrorHandlerParams = {
  title?: string;
  message?: string;
  section?: string;
};

const errorSections: ErrorSection[] = ['AUTH', 'FORGET_PASSWORD'];

export function handleError(params?: ErrorHandlerParams) {
  return (err: AxiosError<{ error: string }>) => {
    const errMessage = params?.message || err?.response?.data.error || 'An error accrued';
    const message = translate(errMessage, {
      cluster: 'ERROR',
      section: params?.section || getErrorSection(err?.request),
    });

    dialog.alert({
      message,
      title: params?.title || 'Failed',
    });
  };
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
    // error.response.data. = 'OK'
    return Promise.reject(error);
  }
);

function getErrorSection(request: XMLHttpRequest): string | undefined {
  return errorSections.filter((s) => request.responseURL.toUpperCase().includes(s))[0];
}
