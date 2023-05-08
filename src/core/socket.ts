import { io } from 'socket.io-client';
import { config } from 'src/config';
import Cookies from 'js-cookie';

// FIXME : should get from storage system
export const socket = io(config.baseURL, {
  auth: { token: Cookies.get('access_token') },
});
