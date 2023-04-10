import { useMatch } from '@tanstack/react-location';
import css from './hired.module.scss';
import { Accordion } from '../../../../../components/atoms/accordion/accordion';
import { missionToApplicantListPayAdaptor } from '../../../job-offer-reject.services';
import { HiredProps } from './hired.types';
import { Loader } from 'src/pages/job-offer-reject/job-offer-reject.types';
import { ApplicantListPay } from '../../../../../components/molecules/applicant-list-pay/applicant-list-pay';
import { endpoint } from '../../../../../core/endpoints';
import { dialog } from '../../../../../core/dialog/dialog';
import { ConfirmResult } from '@capacitor/dialog';
import Dapp from 'src/dapp';

export const Hired = (props: HiredProps): JSX.Element => {
  const { hiredList, endHiredList } = props;
  const { web3 } = Dapp.useWeb3();
  const resolver = useMatch().ownData as Loader;
  const {
    offerOverview: { payment_mode },
    jobOverview: { payment_type },
  } = resolver;
  const isPaidCrypto = payment_type === 'PAID' && payment_mode === 'CRYPTO';

  function onUserConfirm(id: string, escrowId?: string) {
    return async (confirmed: ConfirmResult) => {
      if (web3 && escrowId) await Dapp.withdrawnEscrow(web3, escrowId);
      if (confirmed.value) {
        endpoint.post.missions['{mission_id}/confirm'](id).then(() => history.back());
      }
    };
  }

  function openConfirmDialog(id: string, escrowId?: string) {
    const options = { title: 'Confirm', message: 'Are you sure?', okButtonTitle: 'Confirm' };
    dialog.confirm(options).then(onUserConfirm(id, escrowId));
  }

  return (
    <div className={css.container}>
      <Accordion id="hired" title={`Hired (${hiredList.total_count})`}>
        <ApplicantListPay
          confirmable
          onConfirm={openConfirmDialog}
          list={missionToApplicantListPayAdaptor(hiredList.items)}
          isPaidCrypto={isPaidCrypto}
        />
      </Accordion>
      <Accordion id="end-hired" title={`End-Hired (${endHiredList.total_count})`}>
        <ApplicantListPay list={missionToApplicantListPayAdaptor(endHiredList.items)} />
      </Accordion>
    </div>
  );
};
