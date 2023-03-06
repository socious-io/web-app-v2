import { endpoint } from './../../core/endpoints/index';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  const job = await endpoint.get.projects.project_id(offer.project_id);
  return { offer, job };
}
