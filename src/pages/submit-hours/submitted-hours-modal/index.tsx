import { Modal } from 'src/components/templates/modal/modal';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Button } from 'src/components/atoms/button/button';
import { SubmittedHoursModalTypes } from './submitted-hours-modal.types';
import css from './submitted-hours-modal.module.scss';
import {Card} from "../../../components/atoms/card/card";
import {ProfileView} from "../../../components/molecules/profile-view/profile-view";
import {Input} from "../../../components/atoms/input/input";
import {printWhen} from "../../../core/utils";
import {WebModal} from "../../../components/templates/web-modal";
import {Divider} from "../../../components/templates/divider/divider";
import {ExpandableText} from "../../../components/atoms/expandable-text";
import {Checkbox} from "../../../components/atoms/checkbox/checkbox";
import {useApplyShared} from "../../job-apply/apply/apply.shared";
import {useSubmittedHoursShared} from "../submit-hours.shared";

export const SubmittedHoursModal: React.FC<SubmittedHoursModalTypes> = ({ open, onClose, onSend, onMessage }) => {
  const {
    offer, media, status, onCompleteMission, onStopMission,form,onCancel
  } = useSubmittedHoursShared();
  function onModalClose() {
    onClose();
    form.reset();
  }

  return (
      <>
        <WebModal
            header="Submit hours"
            open={open}
            onClose={onModalClose}
            buttons={
            [
                { children: 'Submit hours', disabled: !form.isValid, onClick: ()=>onsubmit },
                { children: 'Cancel',color:'white', onClick: onModalClose }
            ]
        }
        >
          <div className={css.body}>
            <div className={css.jobInfoContainer}>
              <Card>
                <div className={css.jobTitle}>{offer.project.title}</div>
                <ProfileView
                    img={offer.offerer.meta.image}
                    type={offer.offerer.type}
                    name={offer.offerer.meta.name}
                    username={offer.offerer.meta.shortname}
                    location={`${offer.offerer.meta.city}, ${offer.offerer.meta.country}`}
                />
                <div className={css.agreement}>
                  <span className={css.title}>Agreement : </span>
                  <span className={css.subtitle}>Max {offer.total_hours} hrs / week</span>
                </div>
              </Card>
              <Card className={css.card}>
                <Input className={css.input} register={form} name="submit_hours" placeholder="10:00" label="Input hours" />
              </Card>
            </div>
          </div>
        </WebModal>

      </>
  );
};
