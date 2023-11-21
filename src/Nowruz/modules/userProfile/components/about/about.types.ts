import { Experience } from 'src/core/api';

export interface AboutProps {
  summary?: string;
  experiences?: Experience[] | null;
  skills?: string[] | null;
}
