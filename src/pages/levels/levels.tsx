import { TwoThird } from '../../components/templates/two-third/two-third';
import { Body } from './body/body';
import { Header } from './header/header';
import { LevelsProps } from './levels.types';

export const Levels = (props: LevelsProps): JSX.Element => {
  return <TwoThird top={<Header />} bottom={<Body />} />;
};
