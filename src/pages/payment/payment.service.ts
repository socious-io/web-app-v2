import { cardById, cards, payByOffer, PayReq } from 'src/core/api';

export async function getCreditCardInfo(is_jp: boolean) {
  return cards({ 'filter.is_jp': is_jp });
}

export async function getCreditCardInfoById(id: string) {
  return cardById(id);
}

export async function confirmPayment(offerId: string, body: PayReq) {
  await payByOffer(offerId, body);
}
