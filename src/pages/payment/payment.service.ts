import { get } from 'src/core/http';

export async function getCreditCardInfo() {
  return get('/payments/cards').then(({ data }) => data);
}

export async function getCreditCardInfoById(id: string) {
  return get(`/payments/cards/${id}`).then(({ data }) => data);
}
