import { Education, Experience, LanguageReq } from 'src/core/api';

export interface ImportLinkedInRes {
  experiences: Experience[];
  educations: Education[];
  languages: LanguageReq[];
}
