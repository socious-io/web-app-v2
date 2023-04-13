import { endpoint } from './../../core/endpoints/index';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  return { offer };
}
