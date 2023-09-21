import { get } from 'src/core/http';
import { endpoint } from 'src/core/endpoints';

export async function getCreditCardInfo(is_jp: boolean) {
  return get('/payments/cards', { params: { 'filter.is_jp': is_jp } }).then(({ data }) => data);
}

export async function getCreditCardInfoById(id: string) {
  return get(`/payments/cards/${id}`).then(({ data }) => data);
}

export async function confirmPayment(offerId: string, body: unknown) {
  await endpoint.post.payments['{offer_id/confirm}'](offerId, body);
}

export async function getMissions(payload: { id: string; page: number }): Promise<MissionsResp> {
  return get(`projects/${payload.id}/missions?limit=100&filter.status=ACTIVE,COMPLETE&page=${payload.page}`).then(
    ({ data }) => data
  );
}
