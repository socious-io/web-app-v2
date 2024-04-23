import { CardReq, CardsRes, PaymentsRes, Card, PayReq, PayoutRes, TokenRes, Payment } from './payments.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq, FilterReq } from '../types';

export async function payments(params: PaginateReq): Promise<PaymentsRes> {
  return (await get<PaymentsRes>('payments', { params })).data;
}

export async function payment(id: string): Promise<Payment> {
  return (await get<Payment>(`payments/${id}`)).data;
}
export async function cards(params: FilterReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/cards', { params })).data;
}
export async function cardById(id: string): Promise<CardsRes> {
  return (await get<CardsRes>(`payments/cards/${id}`)).data;
}

export async function addCard(payload: CardReq, is_jp?: boolean): Promise<Card> {
  return (await post<Card>('payments/cards', payload, { params: { is_jp } })).data;
}

export async function updateCard(id: string, payload: CardReq): Promise<Card> {
  return (await post<Card>(`payments/cards/update/${id}`, payload)).data;
}

export async function removeCard(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`payments/cards/remove/${id}`, {})).data;
}

export async function payByOffer(offerId: string, payload: PayReq): Promise<SuccessRes> {
  return (await post<SuccessRes>(`payments/offers/${offerId}`, payload)).data;
}

export async function payoutByMission(missionId: string): Promise<PayoutRes> {
  return (await post<PayoutRes>(`payments/missions/${missionId}/payout`, {})).data;
}

export async function tokenRate(id: string): Promise<TokenRes> {
  return (await get<TokenRes>(`/payments/crypto/rate?token=${id}`)).data;
}
