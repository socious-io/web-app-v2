import css from './hired.module.scss';
import { Accordion } from '../../../../../components/atoms/accordion/accordion';
import { missionToApplicantListPayAdaptor } from '../../../job-offer-reject.services';
import { HiredProps } from './hired.types';
import { ApplicantListPay } from '../../../../../components/molecules/applicant-list-pay/applicant-list-pay';
import { endpoint } from '../../../../../core/endpoints';
import { dialog } from '../../../../../core/dialog/dialog';
import { ConfirmResult } from '@capacitor/dialog';
import Dapp from 'src/dapp';

export const Hired = (props: HiredProps): JSX.Element => {
  const { hiredList, endHiredList } = props;

  const {web3} = Dapp.useWeb3();

  async function onUserConfirm(id: string) {
    return (confirmed: ConfirmResult) => {
      if (confirmed.value) {
        Dapp.withdrawnEscrow(web3, );
        endpoint.post.missions['{mission_id}/confirm'](id).then(() => history.back());
      }
    };
  }

  function openConfirmDialog(id: string) {
    const options = { title: 'Confirm', message: 'Are you sure?', okButtonTitle: 'Confirm' };
    dialog.confirm(options).then(onUserConfirm(id));
  }

  return (
    <div className={css.container}>
      <Accordion id="hired" title={`Hired (${hiredList.total_count})`}>
        <ApplicantListPay
          confirmable
          onConfirm={openConfirmDialog}
          list={missionToApplicantListPayAdaptor(hiredList.items)}
        />
      </Accordion>
      <Accordion id="end-hired" title={`End-Hired (${endHiredList.total_count})`}>
        <ApplicantListPay list={missionToApplicantListPayAdaptor(endHiredList.items)} />
      </Accordion>
    </div>
  );
};
