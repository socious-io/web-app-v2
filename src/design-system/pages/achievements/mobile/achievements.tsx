import { useMatch } from '@tanstack/react-location';
import { TwoThird } from '../../../templates/two-third/two-third';
import { Loader } from '../achievements.types';
import { evaluateTier } from './achievements.service';
import { Body as ImpactCategoryList } from './body/body';
import { Header } from './header/header';

export const Mobile = (): JSX.Element => {
  const { badges } = useMatch().ownData as Loader;
  const activeList = badges.badges.map((badge) => badge.social_cause_category);
  const points = badges.badges.reduce((prev, curr) => prev + curr.total_points, 0);
  const tier = evaluateTier(points);

  return (
    <TwoThird
      top={<Header tier={tier} point={points} />}
      bottom={<ImpactCategoryList activeList={activeList} />}
    />
  );
};
