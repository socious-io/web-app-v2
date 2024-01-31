import { getOffer, stripeLink, StripeLinkRes, stripeProfile, StripeProfileRes, tokenRate } from 'src/core/api';
import { required } from 'src/core/form';
import { FormModel } from 'src/core/form/useForm/useForm.types';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await getOffer(params.id);
  return { offer };
}

export async function findTokenRate(id: string) {
  return tokenRate(id);
}

export async function getStripeLink(country: string, redirect_url: string, is_jp?: boolean): Promise<StripeLinkRes> {
  return stripeLink({ country, is_jp, redirect_url });
}

export async function getSrtipeProfile(is_jp?: boolean): Promise<StripeProfileRes> {
  return stripeProfile({ is_jp });
}

export const formModel: FormModel = {
  country: {
    initialValue: '',
    validators: [required()],
  },
};
