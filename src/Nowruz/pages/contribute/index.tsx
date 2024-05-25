import { Divider } from '@mui/material';
import React, { ReactNode } from 'react';
import variables from 'src/components/_exports.module.scss';
import { Icon } from 'src/Nowruz/general/Icon';
import { AlertMessage } from 'src/Nowruz/modules/general/components/alertMessage';
import { Button } from 'src/Nowruz/modules/general/components/Button';
import { Dot } from 'src/Nowruz/modules/general/components/dot';

import css from './contribute.module.scss';

export const Contribute = () => {
  const renderCheckItems = (title: string, desc: string) => {
    return (
      <div className="flex gap-3 items-start">
        <Icon name="check-circle" fontSize={28} className="text-Brand-600" />
        <p className="text-base font-normal leading-6 text-Gray-light-mode-600">
          <span className="font-semibold">{title}</span>
          {desc}
        </p>{' '}
      </div>
    );
  };

  const renderSteps = (displayConnector: boolean, title: string, desc: ReactNode) => {
    return (
      <div className="w-full flex gap-4">
        <div className="flex flex-col">
          <div className="w-8 h-8 rounded-2xl border border-solid border-Gray-light-mode-300 bg-Gray-light-mode-200 flex items-center justify-center">
            <Dot size="medium" color={variables.color_grey_300} shadow={false} />
          </div>

          {displayConnector && (
            <div className="w-1/2 flex-1 pb-1 ">
              {' '}
              <Divider orientation="vertical" />
            </div>
          )}
        </div>
        <div className="flex flex-col gap-0.5 pt-1 pb-8">
          <div className="text-base font-semibold leading-6 text-Gray-light-mode-700">{title}</div>
          <div className="text-base font-normal leading-6 text-Gray-light-mode-600">{desc}</div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="w-full h-40 md:h-60 bg-no-repeat bg-cover bg-[url('/images/dispute_contributor.jpeg')]" />
      <div className="px-4 md:px-8 flex flex-col gap-8">
        <div className="pt-5 pb-4 md:py-6 border border-solid border-x-0 border-t-0 border-b-Gray-light-mode-200 flex flex-col gap-1">
          <span className=" text-3xl font-semibold leading-[38px] text-Gray-light-mode-900">
            Become a Socious contributor
          </span>
          <span className={css.supprtingText}>
            Join our community of dedicated individuals and help shape the future of the Socious platform.
          </span>
        </div>
        <div className="w-full lg:max-w-[768px] flex flex-col gap-8 items-start">
          <AlertMessage
            theme="warning"
            iconName="alert-circle"
            title="Keep Going to unlock the Socious Contributor program!"
            subtitle="You're making great progress! Reach 10,000 impact points to join our exclusive Contributor program and make an even bigger impact on the Socious platform."
            colOrderMobileView
          />
          <div className={css.supprtingText}>
            As a Socious Contributor, you&apos;ll have the unique opportunity to play an active role in various aspects
            of our platform, including dispute resolution, content moderation, and profile verification. By joining our
            contributor pool, you&apos;ll work alongside like-minded individuals to ensure the integrity, fairness, and
            safety of the Socious community.
          </div>

          <Button variant="text" color="primary" customStyle="!p-0 flex flex-row gap-2">
            <div className=" font-semibold text-base leading-6 text-Brand-700 underline">
              Learn more about the Socious Contributor Program
            </div>
            <Icon name="arrow-right" fontSize={20} className="text-Brand-700" />
          </Button>
          <div className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">Why become a contributor?</div>
          <div className="flex flex-col gap-5 pl-4">
            {renderCheckItems(
              'Shape the platform:',
              ' Your contributions directly influence the user experience and help maintain a trustworthy and engaging environment for all Socious members.',
            )}
            {renderCheckItems(
              'Develop valuable skills:',
              ' Participating as a contributor allows you to develop your problem-solving and decision-making abilities.',
            )}
            {renderCheckItems(
              'Earn rewards:',
              ' To recognize your time and effort, contributors are eligible for rewards such as impact points, exclusive access to features, or other incentives based on their level of involvement.',
            )}
          </div>
          <div className="text-xl font-semibold leading-[30px] text-Gray-light-mode-900">How to get started </div>
          <div className="flex  flex-col">
            {renderSteps(
              true,
              'Reach 10,000 Impact Points',
              'To become a Socious Contributor, you must first earn 10,000 impact points through your active participation and valuable contributions to the platform. This milestone demonstrates your commitment to the Socious community and ensures that our contributor pool consists of dedicated and experienced members.',
            )}
            {renderSteps(
              true,
              'Opt-In to the Contributor Pool',
              <div className="text-base font-normal leading-6 text-Gray-light-mode-600">
                <p>
                  Click the &quot;Join Now&quot; button to opt-in to the Socious Contributor Pool. By opting in, you
                  agree to abide by the Contributor Guidelines and are ready to take on the responsibilities of a
                  contributor. As a member of the contributor pool, you&apos;ll be eligible to be randomly selected for
                  available tasks that match your skills and interests. Some of the exciting opportunities you may be
                  invited to participate in include:
                </p>
                <ul className="list-disc mt-4 ml-8">
                  <li>
                    Reviewing dispute cases as a juror, ensuring fair and unbiased resolution for all parties involved.
                  </li>
                  <li>
                    Moderating user-generated content to maintain a safe and respectful platform environment. (Coming
                    Soon)
                  </li>
                  <li>
                    Verifying user profiles to prevent fraud and maintain trust within the Socious community. (Coming
                    Soon)
                  </li>
                </ul>
              </div>,
            )}
            {renderSteps(
              false,
              'Start contributing',
              `Once you've opted in, you will be granted access to the Contributor Dashboard. As new contributor roles become available, you'll have the opportunity to expand your involvement and make an even greater impact on the Socious platform.`,
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
