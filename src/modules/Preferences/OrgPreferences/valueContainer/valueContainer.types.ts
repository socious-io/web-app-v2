import { Preference } from 'src/core/api';

export type ValueGroup =
  | 'workLifeBalance'
  | 'benefits'
  | 'diversity'
  | 'environmentalImpacts'
  | 'growth'
  | 'socialImpacts'
  | 'transparency';

export interface ValueContainerProps {
  preferences: Preference[];
}
