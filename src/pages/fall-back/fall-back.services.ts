import axios from 'axios';
export const logError = (error: Error, info: { componentStack: string }) => {
  const webHookURL = import.meta.env.VITE_LOG_DISCORD_WEBHOOK;
  axios
    .post(webHookURL, {
      content: `Status: , Message: ${error} ${info.componentStack}`,
    })
    .catch((error) => {
      console.error('Error sending message:', error);
    });
};
