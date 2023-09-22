import { SubmittedHoursModalTypes } from './submitted-hours-modal.types';
import css from './submitted-hours-modal.module.scss';
import { Card } from 'src/components/atoms/card/card';
import { ProfileView } from 'src/components/molecules/profile-view/profile-view';
import { Input } from 'src/components/atoms/input/input';
import { WebModal } from 'src/components/templates/web-modal';
import { useSubmittedHoursShared } from '../submit-hours.shared';
import { formatDate } from 'src/core/time';
import { printWhen } from 'src/core/utils';
import moment from 'moment';

export const SubmittedHoursModal: React.FC<SubmittedHoursModalTypes> = ({ open, onClose, onSend, onMessage }) => {
  const {
    offer,
    media,
    status,
    onCompleteMission,
    onSubmitHours,
    onStopMission,
    mission,
    form,
    onCancel,
    selectedWeek,
    nextWeek,
    previousWeek,
    isSelectedWeekCurrent,
  } = useSubmittedHoursShared();

  function onModalClose() {
    onClose();
    form.reset();
  }

  function onSubmit() {
    onSubmitHours();
    onModalClose();
  }

  return (
    <>
      <WebModal
        header="Submit hours"
        open={open}
        onClose={onModalClose}
        buttons={[
          { children: 'Submit hours', disabled: !form.isValid, onClick: () => onSubmit() },
          { children: 'Cancel', color: 'white', onClick: onModalClose },
        ]}
      >
        <div className={css.body}>
          <div className={css.jobInfoContainer}>
            <Card className={css.weekSelector}>
              <img src="/icons/chevron-left.svg" onClick={previousWeek} />
              {formatDate(selectedWeek.start_at)} - {formatDate(selectedWeek.end_at)},{' '}
              {selectedWeek.end_at.substring(0, 4)}
              <img
                className={`${css.rightChevron} ${isSelectedWeekCurrent() ? css.currentWeek : css.rightChevron}`}
                src="/icons/chevron-left.svg"
                onClick={nextWeek}
              />
            </Card>
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
                <span className={css.subtitle}>
                  {mission.offer.weekly_limit} Max {offer.total_hours} hrs / week
                </span>
              </div>
            </Card>
            <Card className={css.card}>
              <Input className={css.input} register={form} name="total_hours" placeholder="10:00" label="Input hours" />
            </Card>
          </div>
        </div>
      </WebModal>
    </>
  );
};
