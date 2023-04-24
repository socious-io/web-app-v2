import { get } from 'src/core/http';
import { endpoint } from 'src/core/endpoints';

export async function getCreditCardInfo() {
  return get('/payments/cards').then(({ data }) => data);
}

export async function getCreditCardInfoById(id: string) {
  return get(`/payments/cards/${id}`).then(({ data }) => data);
}

export async function confirmPayment(offerId: string, body: unknown) {
  await endpoint.post.payments['{offer_id/confirm}'](offerId, body);
}
