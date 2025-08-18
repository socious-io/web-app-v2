import axios from 'axios';
import { ErrorInfo } from 'react';
import { config } from 'src/config';

export const logError = (error: Error, info: ErrorInfo) => {
  const webHookURL = config.logDiscordWebHook;
  axios
    .post(webHookURL, {
      content: `Status: , Message: ${error} ${info.componentStack}`,
    })
    .catch(error => {
      console.error('Error sending message:', error);
    });
};
