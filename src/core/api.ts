import { AxiosError } from 'axios';
import { dialog } from './dialog/dialog';
import { get } from './http';
import { IdentityReq } from './types';

export function handleError(title: string = 'Failed') {
  return (err: AxiosError<{ error: string }>) => {
    const data = err?.response?.data;
    dialog.alert({ title, message: data?.error || 'An error accrued' });
  };
}

export async function getIdentities(): Promise<IdentityReq[]> {
  return get('/identities').then(({ data }) => data);
}
