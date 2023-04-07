import { endpoint } from 'src/core/endpoints';

export const confirmPayment = async (offerId: string, body: unknown) => {
  await endpoint.post.payments['{offer_id/confirm}'](offerId, body);
};
