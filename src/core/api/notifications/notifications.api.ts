import { NotificationsRes, NotificationsSettings, Notification } from './notifications.types';
import { post, get } from '../http';
import { SuccessRes, PaginateReq } from '../types';

export async function notifications(params: PaginateReq): Promise<NotificationsRes> {
  return (await get<NotificationsRes>('notifications', { params })).data;
}

export async function getNotification(id: string): Promise<Notification> {
  return (await get<Notification>(`notifications/${id}`)).data;
}

export async function readAllNotifications(): Promise<SuccessRes> {
  return (await post<SuccessRes>(`notifications/read/all`, {})).data;
}

export async function readNotifications(id: string): Promise<SuccessRes> {
  return (await post<SuccessRes>(`notifications/read/${id}`, {})).data;
}

export async function notificationSettings(): Promise<NotificationsSettings> {
  return (await get<NotificationsSettings>(`notifications/settings`)).data;
}

export async function updateNotificationSettings(payload: NotificationsSettings): Promise<NotificationsSettings> {
  return (await post<NotificationsSettings>(`notifications/settings`, payload)).data;
}
