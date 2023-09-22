import { useState } from 'react';
import { useMatch, useNavigate } from '@tanstack/react-location';
import { Loader, Week } from './submit-hours.types';
import { endpoint } from 'src/core/endpoints';
import { useAlert } from 'src/hooks/use-alert';
import { useForm } from 'src/core/form';
import { formModel } from './submit-hours';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import moment from 'moment';

export const useSubmittedHoursShared = () => {
  const resolver = useMatch().ownData;
  const { offer, mission, media } = (resolver as Loader) || {};
  const [status, setStatus] = useState(offer.status);
  const [selectedWeek, setSelectedWeek] = useState({
    start_at: moment().clone().weekday(1).toISOString(),
    end_at: moment().clone().weekday(7).toISOString(),
  });
  const alert = useAlert();
  const form = useForm(formModel);
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

  function nextWeek() {
    setSelectedWeek({
      start_at: moment(selectedWeek.start_at).weekday(8).toISOString(),
      end_at: moment(selectedWeek.end_at).weekday(7).toISOString(),
    });
  }

  function isSelectedWeekCurrent() {
    return moment(selectedWeek.start_at) <= moment() && moment() <= moment(selectedWeek.end_at);
  }

  function previousWeek() {
    setSelectedWeek({
      start_at: moment(selectedWeek.start_at).weekday(-6).toISOString(),
      end_at: moment(selectedWeek.end_at).weekday(-7).toISOString(),
    });
  }

  function onSubmitHours() {
    const values: any = getFormValues(form);
    const firstDayOfTheWeek = moment().clone().weekday(1).toISOString();
    const lastDayOfTheWeek = moment().clone().weekday(7).toISOString();

    values.start_at = selectedWeek.start_at; //firstDayOfTheWeek; //'2021-10-14T13:32:30.211Z';
    values.end_at = selectedWeek.end_at; //lastDayOfTheWeek; //'2021-10-15T13:32:30.211Z';
    endpoint.post.missions['{mission_id}/submitworks'](mission.id, values).then(() => {});
  }

  function onStopMission() {
    // TODO: ask @jeyem the current status string
    endpoint.post.missions['{mission_id}/cancel'](mission.id).then(() => setStatus('KICK_OUT'));
  }

  function onCancel() {
    history.back();
  }

  return {
    offer,
    media,
    status,
    onCompleteMission,
    onStopMission,
    form,
    onCancel,
    onSubmitHours,
    selectedWeek,
    mission,
    nextWeek,
    previousWeek,
    isSelectedWeekCurrent,
  };
};
