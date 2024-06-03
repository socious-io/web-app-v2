import { useLoaderData } from 'react-router-dom';
import { UserProfile } from 'src/core/api';

import css from './contribute.module.scss';
export const useContribute = () => {
  const { user } = useLoaderData() as { user: UserProfile };
  const eligible = user.impact_points >= 10000;

  const checkItems = [
    {
      title: 'Shape the platform:',
      desc: ' Your contributions directly influence the user experience and help maintain a trustworthy and engaging environment for all Socious members.',
    },
    {
      title: 'Develop valuable skills:',
      desc: ' Participating as a contributor allows you to develop your problem-solving and decision-making abilities.',
    },
    {
      title: 'Earn rewards:',
      desc: ' To recognize your time and effort, contributors are eligible for rewards such as impact points, exclusive access to features, or other incentives based on their level of involvement.',
    },
  ];

  const steps = [
    {
      title: 'Reach 10,000 Impact Points',
      desc: 'To become a Socious Contributor, you must first earn 10,000 impact points through your active participation and valuable contributions to the platform. This milestone demonstrates your commitment to the Socious community and ensures that our contributor pool consists of dedicated and experienced members.',
    },
    {
      title: 'Opt-In to the Contributor Pool',
      desc: (
        <div className={css.text}>
          <p>
            Click the &quot;Join Now&quot; button to opt-in to the Socious Contributor Pool. By opting in, you agree to
            abide by the Contributor Guidelines and are ready to take on the responsibilities of a contributor. As a
            member of the contributor pool, you&apos;ll be eligible to be randomly selected for available tasks that
            match your skills and interests. Some of the exciting opportunities you may be invited to participate in
            include:
          </p>
          <ul className="list-disc mt-4 ml-8">
            <li>Reviewing dispute cases as a juror, ensuring fair and unbiased resolution for all parties involved.</li>
            <li>
              Moderating user-generated content to maintain a safe and respectful platform environment. (Coming Soon)
            </li>
            <li>
              Verifying user profiles to prevent fraud and maintain trust within the Socious community. (Coming Soon)
            </li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Start contributing',
      desc: "Once you've opted in, you will be granted access to the Contributor Dashboard. As new contributor roles become available, you'll have the opportunity to expand your involvement and make an even greater impact on the Socious platform.",
    },
  ];
  return { checkItems, steps, eligible };
};
