import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { get } from 'src/core/http';
import { MissionsResp } from 'src/core/types';
import { Menu } from 'src/components/molecules/card-menu/card-menu.types';

export async function getMissionsList(payload: { page?: number }): Promise<MissionsResp> {
  return get('/user/missions', {
    params: { 'filter.o.payment_mode': 'FIAT', 'filter.p.payment_type': 'PAID', 'filter.status': 'CONFIRMED' },
  }).then(({ data }) => data);
}

export async function getStripeLink(value: string): Promise<any> {
  return get(`/auth/stripe/connect-link?country=${value}`).then(({ data }) => data);
}

export async function getSrtipeProfile(): Promise<any> {
  return get('/auth/stripe/profile').then(({ data }) => data);
}

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};

export const NetworkMenuList: Menu[] = [
  { label: 'Connections', icon: '/icons/network.svg' },
  { label: 'Followers', icon: '/icons/followers.svg' },
];
