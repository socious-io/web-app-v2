import { Divider } from '@mui/material';
import React, { ReactNode } from 'react';
import { AlertMessage } from 'src/modules/general/components/alertMessage';
import { Button } from 'src/modules/general/components/Button';
import { Checkbox } from 'src/modules/general/components/checkbox/checkbox';
import { Dot } from 'src/modules/general/components/dot';
import { Icon } from 'src/modules/general/components/Icon';
import { Modal } from 'src/modules/general/components/modal';
import variables from 'src/styles/constants/_exports.module.scss';

import css from './contributorJoin.module.scss';
import { useContributorJoin } from './useContributorJoin';

interface ContributorJoinProps {
  eligible: boolean;
  setNewlyJoined: (val: boolean) => void;
}

export const ContributorJoin: React.FC<ContributorJoinProps> = ({ eligible, setNewlyJoined }) => {
  const { checkItems, steps, openModal, setOpenModal, accepted, setAccepted, handleJoin, isContributor } =
    useContributorJoin(setNewlyJoined);

  const renderCheckItems = (title: string, desc: string) => {
    return (
      <div className="flex gap-3 items-start">
        <Icon name="check-circle" fontSize={28} className="text-Brand-600" />
        <p className={css.text}>
          <span className="font-semibold">{title}</span>
          {desc}
        </p>
      </div>
    );
  };

  const renderSteps = (step: number, title: string, desc: ReactNode) => {
    const checked = <Icon name="check-circle-filled" fontSize={32} className="text-Brand-600" />;
    const current = (
      <div
        className="w-8 h-8 rounded-2xl  bg-Brand-600 flex items-center justify-center"
        style={{ boxShadow: `0 0 0 4px ${variables.color_primary_200}` }}
      >
        <Dot size="medium" color="white" shadow={false} />
      </div>
    );
    const incomplete = (
      <div className="w-8 h-8 rounded-2xl border-2 border-solid border-Gray-light-mode-200 bg-Gray-light-mode-50 flex items-center justify-center">
        <Dot size="medium" color={variables.color_grey_300} shadow={false} />
      </div>
    );

    const icons = [checked, current, incomplete];
    const dividerColors = [variables.color_primary_700, variables.color_grey_200];
    return (
      <div className="w-full flex gap-4">
        <div className="flex flex-col gap-1 pb-1">
          {eligible ? icons[step] : incomplete}
          {step < 2 && (
            <div
              className="w-0.5 flex-1 rounded-default self-center"
              style={{ backgroundColor: eligible ? dividerColors[step] : variables.color_grey_200 }}
            />
          )}
        </div>
        <div className="flex flex-col gap-0.5 pt-1 pb-8">
          <div className={css.bold}>{title}</div>
          <div className={css.text}>{desc}</div>
        </div>
      </div>
    );
  };

  const modalFooter = (
    <div className="w-full flex flex-col md:flex-row-reverse gap-3 pt-6 pb-4 px-4 md:pt-8 md:pb-6 md:px-6">
      <Button variant="contained" color="primary" fullWidth disabled={!accepted} onClick={handleJoin}>
        Join now
      </Button>
      <Button variant="outlined" color="primary" fullWidth onClick={() => setOpenModal(false)}>
        Cancel
      </Button>
    </div>
  );
  return (
    <div>
      <div className="w-full h-40 md:h-60 bg-no-repeat bg-cover bg-[url('/images/dispute-contributor.png')]" />
      <div className="px-4 md:px-8 pb-12 flex flex-col gap-8">
        <div className="pt-5 pb-4 md:py-6 border border-solid border-x-0 border-t-0 border-b-Gray-light-mode-200 flex flex-col gap-1">
          <span className=" text-3xl font-semibold leading-[38px] text-Gray-light-mode-900">
            Become a Socious contributor
          </span>
          <span className={css.supprtingText}>
            Join our community of dedicated individuals and help shape the future of the Socious platform.
          </span>
        </div>
        <div className="w-full lg:max-w-[768px] flex flex-col gap-8 items-start">
          {eligible && isContributor === null && (
            <AlertMessage
              theme="success"
              iconName="check-circle"
              title="Congratulations on reaching 10,000 impact points!"
              subtitle="You're now invited to join our Socious Contributor community and make an even bigger impact on our platform. Click to join now!"
              colOrderMobileView
            />
          )}
          {!eligible && (
            <AlertMessage
              theme="warning"
              iconName="alert-circle"
              title="Keep Going to unlock the Socious Contributor program!"
              subtitle="You're making great progress! Reach 10,000 impact points to join our exclusive Contributor program and make an even bigger impact on the Socious platform."
              colOrderMobileView
            />
          )}

          <div className={css.supprtingText}>
            As a Socious Contributor, you&apos;ll have the unique opportunity to play an active role in various aspects
            of our platform, including dispute resolution, content moderation, and profile verification. By joining our
            contributor pool, you&apos;ll work alongside like-minded individuals to ensure the integrity, fairness, and
            safety of the Socious community.
          </div>

          {/* <Button variant="text" color="primary" customStyle="!p-0 flex flex-row gap-2">
            <div className={`${css.bold} text-Brand-700 underline`}>
              Learn more about the Socious Contributor Program
            </div>
            <Icon name="arrow-right" fontSize={20} className="text-Brand-700" />
          </Button> */}
          <div className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">Why become a contributor?</div>
          <div className="flex flex-col gap-5 pl-4">
            {checkItems.map(item => renderCheckItems(item.title, item.desc))}
          </div>
          {eligible && (
            <Button variant="contained" color="primary" customStyle=" mx-auto" onClick={() => setOpenModal(true)}>
              Join now
            </Button>
          )}
          <div className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">How to get started </div>
          <div className="flex  flex-col">{steps.map((item, index) => renderSteps(index, item.title, item.desc))}</div>
          {eligible && (
            <Button variant="contained" color="primary" customStyle=" mx-auto" onClick={() => setOpenModal(true)}>
              Join now
            </Button>
          )}
        </div>
      </div>
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        title="Join the Socious Contributor program"
        subTitle="You've unlocked the opportunity to make an even greater impact on the Socious platform. By opting in, you agree to abide by the Contributor Guidelines and take on the responsibilities of a valued member of our contributor community."
        footer={modalFooter}
        mobileCentered
        mobileFullHeight={false}
        headerDivider={false}
        footerDivider={false}
        customStyle="md:max-w-[400px]"
        closeButtonClassName="hidden"
      >
        <div className="px-4 md:px-6">
          <Checkbox
            id="agreement-chk"
            label="I have read, understand, and agree to abide by the Socious Contributor Guidelines."
            checked={accepted}
            onChange={e => setAccepted(e.target.checked)}
            value
          />
        </div>
      </Modal>
    </div>
  );
};
