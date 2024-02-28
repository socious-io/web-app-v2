import axios from 'axios';
import { config } from 'src/config';

export const logError = (error: Error, info: { componentStack: string }) => {
  const webHookURL = config.logDiscordWebHook;
  axios
    .post(webHookURL, {
      content: `Status: , Message: ${error} ${info.componentStack}`,
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
};
