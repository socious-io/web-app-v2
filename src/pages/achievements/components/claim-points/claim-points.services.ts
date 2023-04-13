import { Config, WebLinker } from 'ssi-auth-lib';

const config: Config = {
  size: 260,
  serviceDid: '8DXffTYfukQsk3NZZP3ypS',
  interactionId: '1',
  instanceId: '6374a508515f5a539afd400c',
  button: {
    text: 'Go to proofSpace app',
    style: `
    color: var(--color-primary-01);
    height: 2.75rem;
    text-align: center;
    font-weight: 600;
    background-color: var(--color-white);
    border-radius: 50px;
    padding: 0 1rem;
    border: 1px solid var(--color-gray-04);
    `,
  },
  qr: {
    style: 'display: flex; justify-content: center;',
  },
};

export function generateQRCode(id: string, el: HTMLDivElement) {
  return WebLinker.start(el, config, [
    {
      credentialId: '8DXffTYfukQsk3NZZP3ypS:3:CL:266:tag',
      attributes: [
        { name: 'Socious User ID', value: id },
        {
          name: 'Credential Issue Date',
          value: `${new Date().getTime()}`,
        },
      ],
    },
  ]);
}
