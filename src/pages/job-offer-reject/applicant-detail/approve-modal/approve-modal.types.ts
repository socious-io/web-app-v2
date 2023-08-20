import { ModalProps } from 'src/components/templates/modal/modal.types';
import { ApplicantResp } from 'src/core/types';

export interface OfferModalProps extends Omit<ModalProps, 'children'> {
  applicantDetail: ApplicantResp;
  missionDetail: {work_id:string,mission_id:string};
  onDone: () => void;
}
