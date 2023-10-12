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
  const timedifference = -new Date().getTimezoneOffset() / 60;
  const { offer, mission, media } = (resolver as Loader) || {};
  const [status, setStatus] = useState(offer.status);
  const [selectedWeek, setSelectedWeek] = useState({
    start_at: moment()
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .add(timedifference, 'hours')
      .clone()
      .weekday(1)
      .toISOString(),
    end_at: moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).clone().weekday(7).toISOString(),
  });

  const alert = useAlert();
  const form = useForm(formModel);

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
      start_at: moment(selectedWeek.start_at)
        .weekday(8)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .add(timedifference, 'hours')
        .toISOString(),
      end_at: moment(selectedWeek.end_at)
        .weekday(7)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .add(timedifference, 'hours')
        .toISOString(),
    });
  }

  function isSelectedWeekCurrent() {
    return (
      moment(selectedWeek.start_at) <=
        moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).add(timedifference, 'hours') &&
      moment().set({ hour: 9, minute: 0, second: 0, millisecond: 0 }).add(timedifference, 'hours') <=
        moment(selectedWeek.end_at)
    );
  }

  function isFirstWeekOfMission() {
    return (
      moment(selectedWeek.start_at) <= moment(mission.created_at) &&
      moment(mission.created_at) <= moment(selectedWeek.end_at)
    );
  }

  function previousWeek() {
    setSelectedWeek({
      start_at: moment(selectedWeek.start_at)
        .weekday(-6)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .add(timedifference, 'hours')
        .toISOString(),
      end_at: moment(selectedWeek.end_at)
        .weekday(-7)
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
        .add(timedifference, 'hours')
        .toISOString(),
    });
  }

  function onSubmitHours() {
    const values: any = getFormValues(form);

    values.start_at = moment(selectedWeek.start_at)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .add(timedifference, 'hours')
      .toISOString();
    values.end_at = selectedWeek.end_at;
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
    isFirstWeekOfMission,
  };
};
