import { useState } from 'react';
import {useMatch, useNavigate} from '@tanstack/react-location';
import { Loader } from './submit-hours.types';
import { endpoint } from 'src/core/endpoints';
import { useAlert } from 'src/hooks/use-alert';
import {useForm} from "../../core/form";
import {formModel} from "./submit-hours";
import {generatePayload} from "../job-apply/apply/apply.services";
import {getFormValues} from "../../core/form/customValidators/formValues";

export const useSubmittedHoursShared = () => {
  const resolver = useMatch().ownData;
  const { offer, mission, media } = (resolver as Loader) || {};
  const [status, setStatus] = useState(offer.status);
  const alert = useAlert();
  const form = useForm(formModel)
  const navigate = useNavigate();
  function onCompleteMission() {
    function onConfirm() {
      endpoint.post.missions['{mission_id}/complete'](mission.id).then(() => setStatus('CLOSED'));
    }

    const options = {
      title: 'Mark as completed',
      message: `Once ${resolver?.offer?.organization?.name} confirms the job completion, you will receive your payment.`,
      okButtonTitle: 'Confirm',
    };
    alert.confirm(options, onConfirm);
  }
  function onSubmitHours(){
    const values:any = getFormValues(form);
    values.start_at ="2021-10-14T13:32:30.211Z"
    values.end_at ="2021-10-15T13:32:30.211Z"
    endpoint.post.missions['{mission_id}/submitworks'](mission.id,values).then(() => {
    });
  }

  function onStopMission() {
    // TODO: ask @jeyem the current status string
    endpoint.post.missions['{mission_id}/cancel'](mission.id).then(() => setStatus('KICK_OUT'));
  }
  function onCancel() {
    history.back()
  }

  return { offer, media, status, onCompleteMission, onStopMission,form,onCancel,onSubmitHours };
};
