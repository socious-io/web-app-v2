export function getProcess(email: string): { title: string; content: string; iconUrl: string }[] {
  return [
    {
      title: 'Get verified',
      content: `Send a company registration document such as a company certificate/equivalent along with your organization name to ${email}.`,
      iconUrl: '/icons/email.svg',
    },
    {
      title: 'Wait for processing',
      content: `Our verification team will take 1-3 days to process your verification request. `,
      iconUrl: '/icons/hourglass.svg',
    },
    {
      title: 'Verified!',
      content: `An email and notification will be sent to you upon successful verification and you will then be able to start posting jobs.`,
      iconUrl: '/icons/verified.svg',
    },
  ];
}
