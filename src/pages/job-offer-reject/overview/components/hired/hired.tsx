import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Accordion } from 'src/components/atoms/accordion/accordion';
import { ApplicantListPay } from 'src/components/molecules/applicant-list-pay/applicant-list-pay';
import { confirmMission, contestMission, feedbackMission, offerByApplicant } from 'src/core/api';
import { dialog } from 'src/core/dialog/dialog';
import Dapp from 'src/dapp';
import { useAlert } from 'src/hooks/use-alert';
import { missionToApplicantListPayAdaptor } from 'src/pages/job-offer-reject/job-offer-reject.services';
import { Loader } from 'src/pages/job-offer-reject/job-offer-reject.types';
import { FeedbackModal } from 'src/pages/job-offer-reject/overview/components/feedback-modal';
import { Rate } from 'src/pages/job-offer-reject/overview/components/feedback-modal/feedback-modal.types';
import store from 'src/store';
import { hideSpinner, showSpinner } from 'src/store/reducers/spinner.reducer';

import css from './hired.module.scss';
import { HiredProps } from './hired.types';

export const Hired = (props: HiredProps): JSX.Element => {
  const navigate = useNavigate();
  const { hiredList, endHiredList: endHiredListDefault, onDone } = props;
  const [endHiredList, setEndHiredList] = useState(endHiredListDefault);
  const { web3 } = Dapp.useWeb3();
  const [process, setProcess] = useState(false);
  const resolver = useLoaderData() as Loader;
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

    if (!web3 && escrowId) {
      dialog.confirm({
        title: 'Connect your wallet',
        message: `Please connect your wallet before confirm the job`,
        okButtonTitle: 'OK',
      });
      store.dispatch(hideSpinner());
      setProcess(false);
      return;
    }
    if (web3 && escrowId) {
      try {
        await Dapp.withdrawnEscrow(web3, escrowId);
        confirmMission(id).then(onDone);
      } catch (err: any) {
        dialog.confirm({
          title: 'Unhandled Error',
          message: `Please call support team seems like withdrawn escrow got error : ${err.message}`,
          okButtonTitle: 'OK',
        });
      }
    } else {
      confirmMission(id).then(onDone);
    }

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
    navigate(`/chats/new/${id}`);
  }

  function onSubmitFeedback() {
    const updatedEndHiredList = { ...endHiredList };
    const itemIndex = endHiredList.items.findIndex((item) => item.id === selectedIdFeedback.id);

    setSelectedIdFeedback(false);
    if (satisfactory === 'satisfactory') {
      feedbackMission(selectedIdFeedback.id, feedbackText).then(() => {
        {
          updatedEndHiredList.items[itemIndex].org_feedback = { content: feedbackText };
          setEndHiredList({ ...updatedEndHiredList });
          setSelectedIdFeedback(false);
        }
      });
    } else {
      contestMission(selectedIdFeedback.id, feedbackText).then(() => {
        {
          updatedEndHiredList.items[itemIndex].org_feedback = { content: feedbackText };
          setEndHiredList({ ...updatedEndHiredList });
          setSelectedIdFeedback(false);
        }
      });
    }
  }
  async function onRehireClick(projectId: string) {
    const selected = props.endHiredList.items.find((item) => item.id === projectId);
    if (selected) {
      let payload = {
        offer_message: selected.offer.offer_message,
        assignment_total: selected.offer.total_hours,
      };
      if (selected.project.payment_type === 'PAID' && selected.offer.payment_mode !== 'FIAT')
        payload = {
          ...payload,
          crypto_currency_address: selected.offer.crypto_currency_address,
          payment_mode: selected.offer.payment_mode,
        };
      try {
        const offerRes = await offerByApplicant(selected.applicant.id, payload);
        dialog.alert({ title: 'Confirmed', message: 'You successfully sent an offer' });
        navigate(`/jobs`);
      } catch {
        dialog.alert({ title: 'Failed', message: 'Please try again later' });
      }
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
          onRehire={onRehireClick}
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
