import { CardReq, CardsRes, PaymentsRes, Card, PayReq, PayoutRes } from './payments.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq } from '../types';

export async function payments(params: PaginateReq): Promise<PaymentsRes> {
  return (await get<PaymentsRes>('payments', { params })).data;
}

export async function cards(params: PaginateReq): Promise<CardsRes> {
  return (await get<CardsRes>('payments/cards', { params })).data;
}

export async function addCard(payload: CardReq): Promise<Card> {
  return (await post<Card>('payments/cards', payload)).data;
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
