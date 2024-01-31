import { FirebaseMessaging } from '@capacitor-firebase/messaging';

export const checkPermissions = async () => {
  const result = await FirebaseMessaging.checkPermissions();
  return result.receive;
};

export const requestPermissions = async () => {
  const result = await FirebaseMessaging.requestPermissions();
  return result.receive;
};

export const getToken = async (): Promise<string> => {
  return FirebaseMessaging.getToken()
    .then(({ token }) => {
      console.log('token', token);

      return token;
    })
    .catch(() => '');
};

export const addNotificationReceivedListener = async () => {
  await FirebaseMessaging.addListener('notificationReceived', (event) => {
    console.log('notificationReceived', { event });
  });
};

export const getDeliveredNotifications = async () => {
  const result = await FirebaseMessaging.getDeliveredNotifications();
  return result.notifications;
};

export const subscribeToTopic = async (topic: string) => {
  await FirebaseMessaging.subscribeToTopic({ topic });
};

export const unsubscribeToPushNotifs = async () => {
  await FirebaseMessaging.removeAllListeners();
};

export const deletePushNotifToken = async () => {
  await FirebaseMessaging.deleteToken();
};
