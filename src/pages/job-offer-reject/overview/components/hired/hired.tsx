import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import store from 'src/store/store';
import { hideSpinner, showSpinner } from 'src/store/reducers/spinner.reducer';
import css from './hired.module.scss';
import { Accordion } from '../../../../../components/atoms/accordion/accordion';
import { missionToApplicantListPayAdaptor } from '../../../job-offer-reject.services';
import { HiredProps } from './hired.types';
import { Loader } from 'src/pages/job-offer-reject/job-offer-reject.types';
import { ApplicantListPay } from '../../../../../components/molecules/applicant-list-pay/applicant-list-pay';
import { endpoint } from '../../../../../core/endpoints';
import { dialog } from '../../../../../core/dialog/dialog';
import Dapp from 'src/dapp';
import { FeedbackModal } from '../feedback-modal';
import { Rate } from '../feedback-modal/feedback-modal.types';
import { useAlert } from 'src/hooks/use-alert';

export const Hired = (props: HiredProps): JSX.Element => {
  const navigate = useNavigate();
  const { hiredList, endHiredList, onDone } = props;
  const { web3 } = Dapp.useWeb3();
  const [process, setProcess] = useState(false);
  const resolver = useMatch().ownData as Loader;
  const { offerOverview, jobOverview } = resolver || {};
  const isPaidCrypto = jobOverview?.payment_type === 'PAID' && offerOverview?.payment_mode === 'CRYPTO';
  const [selectedIdFeedback, setSelectedIdFeedback] = useState<{ id: string; status: 'CONFIRMED' | string }>({
    id: '',
    status: '',
  });
  const [feedbackText, setFeedbackText] = useState('');
  const [satisfactory, setSatisfactory] = useState<Rate>('satisfactory');
  const alert = useAlert();
  const selectedFeedbackName = endHiredList.items?.find((list) => list.id === selectedIdFeedback.id)?.assignee?.meta;

  async function onUserConfirm(id: string, escrowId?: string) {
    store.dispatch(showSpinner());
    setProcess(true);
    if (web3 && escrowId) {
      try {
        await Dapp.withdrawnEscrow(web3, escrowId);
      } catch (err: any) {
        dialog.confirm({
          title: 'Unhandled Error',
          message: `Please call support team seems like withdrawn escrow got error : ${err.message}`,
          okButtonTitle: 'OK',
        });
      }
    }
    endpoint.post.missions['{mission_id}/confirm'](id).then(onDone);
    store.dispatch(hideSpinner());
    setProcess(false);
  }

  function openConfirmDialog(id: string, escrowId?: string) {
    if (process) return;
    const name = resolver.hiredList.items.find((user) => user.id === id)?.assignee?.meta?.name;
    const message = `By confirming its completion, the job will end, and ${name} will receive their payment.`;
    const options = { title: 'Confirm completion', message, okButtonTitle: 'Confirm' };
    alert.confirm(options, () => onUserConfirm(id, escrowId));
  }

  function onMessageClick(id: string) {
    navigate({ to: `/chats/new/${id}` });
  }

  function onSubmitFeedback() {
    setSelectedIdFeedback(false);
    if (satisfactory === 'satisfactory') {
      endpoint.post.missions['{mission_id}/feedback'](selectedIdFeedback.id, { content: feedbackText }).then(() =>
        setSelectedIdFeedback(false)
      );
    } else {
      endpoint.post.missions['{mission_id}/contest'](selectedIdFeedback.id, { content: feedbackText }).then(() =>
        setSelectedIdFeedback(false)
      );
    }
  }

  return (
    <div className={css.container}>
      <Accordion id="hired" title={`Hired (${hiredList.total_count})`}>
        <ApplicantListPay
          confirmable={offerOverview?.status === 'CLOSED'}
          onConfirm={openConfirmDialog}
          list={missionToApplicantListPayAdaptor(hiredList.items)}
          isPaidCrypto={isPaidCrypto}
          onMessageClick={onMessageClick}
        />
      </Accordion>
      <Accordion id="end-hired" title={`End-Hired (${endHiredList.total_count})`}>
        <ApplicantListPay
          list={missionToApplicantListPayAdaptor(endHiredList.items)}
          onMessageClick={onMessageClick}
          onFeedback={(id, status) => setSelectedIdFeedback({ id, status })}
        />
      </Accordion>
      <FeedbackModal
        open={!!selectedIdFeedback.id}
        onClose={() => setSelectedIdFeedback({ ...selectedIdFeedback, id: '' })}
        buttons={[{ children: 'Submit', disabled: !feedbackText, onClick: onSubmitFeedback }]}
        talent_name={(selectedFeedbackName?.name || selectedFeedbackName?.username) as string}
        onChangeTextHandler={setFeedbackText}
        onRate={(value) => setSatisfactory(value as Rate)}
        selectedRate={satisfactory}
      />
    </div>
  );
};
