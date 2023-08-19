import { WebModal } from 'src/components/templates/web-modal';
import { OfferModalProps } from './approve-modal.types';
import { useApplicantDetailShared } from '../applicant-detail.shared';
import css from './approve-modal.module.scss';
import {Card} from "../../../../components/atoms/card/card";

export const ApproveModal: React.FC<OfferModalProps> = ({ open, onClose, applicantDetail, onDone }) => {

  const {  unit } = useApplicantDetailShared();

  async function onSubmit() {

  }
  function onCancel(){

  }
  const total = 300;
  return (
    <WebModal
      header={'Approve hours'}
      open={open}
      onClose={onClose}
      buttons={
      [
          { children: 'Approve', onClick: onSubmit },
          { children: 'Cancel',color:'white', onClick: onCancel }
      ]
    }
    >
      <div className={css.main}>
        <div className={css.description}>
          By confirm the hours submission, {applicantDetail.user.first_name} will receive the below payment.
        </div>
        <div>
          <Card className={css.card}>
            <div className={css.title}>
              Weekly payment summery
            </div>
            <div className={css.summery}>
              <div className={css.summery_item}>
                <span className={css.total_week}>Total week</span>
                <span>{total} {unit}</span>
              </div>
              <div className={css.summery_item}>
                <span>Socious commission (2%)</span>
                <span>{Math.floor(total * (2/100))} {unit}</span>
              </div>
            </div>
            <div className={css.total}>
              <div className={css.total_item}>
                <span>Total</span>
                <span className={css.count}>{total + (Math.floor(total * (2/100)))} {unit}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </WebModal>
  );
};
