import { Menu } from 'src/components/molecules/card-menu/card-menu.types';
import { endpoint } from 'src/core/endpoints/index';

export async function receivedOfferLoader(params: { id: string }) {
  const offer = await endpoint.get.offers.offer_id(params.id);
  return { offer };
}

export const NetworkMenuList: Menu[] = [
  { label: 'Connections', icon: '/icons/network.svg' },
  { label: 'Followers', icon: '/icons/followers.svg' },
];
