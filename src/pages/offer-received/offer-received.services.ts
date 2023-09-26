import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';
import { endpoint } from 'src/core/endpoints/index';
import { get } from 'src/core/http';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  return { offer };
}

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}

export async function getStripeLink(country: string, is_jp?: boolean): Promise<any> {
  return get('/auth/stripe/connect-link', { params: { country, is_jp, redirect_url: location.href } }).then(
    ({ data }) => data
  );
}

export async function getSrtipeProfile(is_jp?: boolean): Promise<any> {
  return get('/auth/stripe/profile', { params: { is_jp } }).then(({ data }) => data);
}

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};
