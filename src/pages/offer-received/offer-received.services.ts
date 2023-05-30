import { Menu } from 'src/components/molecules/card-menu/card-menu.types';
import { endpoint } from 'src/core/endpoints/index';
import { get } from 'src/core/http';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  return { offer };
}

export async function findTokenRate(id: string) {
  return get(`/payments/crypto/rate?token=${id}`).then(({ data }) => data);
}

export const NetworkMenuList: Menu[] = [
  { label: 'Connections', icon: '/icons/network.svg' },
  { label: 'Followers', icon: '/icons/followers.svg' },
];
