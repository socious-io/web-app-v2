import css from './claim-points.module.scss';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { generateQRCode } from './claim-points.services';

export const ClaimPoints = (): JSX.Element => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const identityId = useSelector<RootState, string>((state) => {
    return state.identity.entities.find((identity) => identity.current)!.id;
  });

  useEffect(() => {
    generateQRCode(identityId, qrCodeRef.current as HTMLDivElement)
      .then((resp) => console.log('resp: ', resp))
      .catch((e) => console.log('error: ', e));
  }, []);

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
        {/* https://play.google.com/store/apps/details?id=io.zaka.app&pli=1 */}
        <img src="/icons/download-appstore.svg" />
        {/* https://apps.apple.com/us/app/proofspace/id1512258409 */}
        <img src="/icons/download-googleplay.svg" />
      </div>
      <p className={css.paragraph}>1. Choose “Socious” as a service</p>
      <p className={css.paragraph}>2. Click on the QR reader Icon and scan the QR code below </p>
      <p className={css.paragraph}>
        3. Congratulations! Your impact points are now recorded on Cardano blockchain as verifiable credentials!{' '}
      </p>
      <div ref={qrCodeRef} />
    </div>
  );
};
