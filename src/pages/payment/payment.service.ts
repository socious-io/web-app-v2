import { endpoint } from 'src/core/endpoints';
import { get } from 'src/core/http';

export async function getCreditCardInfo(is_jp: boolean) {
  return get('/payments/cards', { params: { 'filter.is_jp': is_jp } }).then(({ data }) => data);
}

export async function getCreditCardInfoById(id: string) {
  return get(`/payments/cards/${id}`).then(({ data }) => data);
}

export async function confirmPayment(offerId: string, body: unknown) {
  await endpoint.post.payments['{offer_id/confirm}'](offerId, body);
}
