import css from './claim-points.module.scss';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { generateQRCode } from './claim-points.services';
import { printWhen } from 'src/core/utils';
import { Capacitor } from '@capacitor/core';
import { encode } from 'js-base64';

export const ClaimPoints = (): JSX.Element => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const identityId = useSelector<RootState, string>((state) => {
    return state.identity.entities.find((identity) => identity.current)!.id;
  });

  const json = {
    id: '6374a508515f5a539afd400c',
    actionId: '1',
    serviceDid: '8DXffTYfukQsk3NZZP3ypS',
    preparedCredentials: [
      {
        credentialId: '8DXffTYfukQsk3NZZP3ypS:3:CL:266:tag',
        attributes: [
          { name: 'Socious User ID', value: identityId },
          //   { name: 'Credential Issue Date', value: '1682976032885' },
          { name: 'Credential Issue Date', value: Date.now().toString() },
        ],
      },
    ],
  };

  const objJsonB64 = encode(JSON.stringify(json));
  const deepLinkUrl = 'zakaio://platform.proofspace.id/native/execute/' + objJsonB64;
  console.log('deepLinkUrl: ', deepLinkUrl);

  useEffect(() => {
    generateQRCode(identityId, qrCodeRef.current as HTMLDivElement).catch((e) => console.log('error: ', e));
  }, []);

  const appStoreJSX = (
    <a href="https://apps.apple.com/us/app/proofspace/id1512258409" target="_blank">
      <img width={170} src="/images/download-appstore.svg" />
    </a>
  );

  const playStoreJSX = (
    <a href="https://play.google.com/store/apps/details?id=io.zaka.app&pli=1" target="_blank">
      <img width={170} src="/images/download-googleplay.png" />
    </a>
  );

  const goToProofspaceJSX = (
    <a className={css.proofspaceButton} href={deepLinkUrl} target="_blank">
      <div className={css.proofspaceLink}>Go to proofSpace app</div>
    </a>
  );

  console.log({ deepLinkUrl });

  return (
    <div className={css.container}>
      <div className={css.titles}>Claim your impact points</div>
      <p className={css.paragraph}>Claim your impact points as verifiable credentials and receive rewards!</p>
      <div className={css.box}>
        <p className={css.paragraph}>
          Socious uses blockchain technology to make environmental/social impact transparent and traceable. This
          prevents greenwashing and allows us to reward verified contributors.We've partnered with ProofSpace/Atala
          Prism through which your decentralized ID can receive verifiable credentials.
        </p>
      </div>
      <div className={css.titles}>How to claim impact points</div>
      <p className={css.paragraph}>1. Download the ProofSpace app</p>
      <p className={css.paragraph}>
        Go through the ProofSpace app's onboarding process which will create a decentralized ID on Atala Prism.
      </p>
      <div className={css.downloads}>
        {printWhen(playStoreJSX, Capacitor.getPlatform() === 'android')}
        {printWhen(appStoreJSX, Capacitor.getPlatform() === 'ios')}
      </div>
      <p className={css.paragraph}>2. Choose “Socious” as a service</p>
      <p className={css.paragraph}>
        3. Congratulations! Your impact points are now recorded on Cardano blockchain as verifiable credentials!{' '}
      </p>
      {printWhen(<div className={css.proofspaceButton} ref={qrCodeRef} />, !Capacitor.isNativePlatform())}
      {printWhen(goToProofspaceJSX, Capacitor.isNativePlatform())}
    </div>
  );
};
