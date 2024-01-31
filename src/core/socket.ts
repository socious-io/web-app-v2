import Cookies from 'js-cookie';
import { io } from 'socket.io-client';
import { config } from 'src/config';

// FIXME : should get from storage system
export const socket = io(config.socketURL, {
  auth: { token: Cookies.get('access_token') },
});
