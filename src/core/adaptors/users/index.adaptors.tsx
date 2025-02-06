import { Languages, LinkedInLanguageLevel } from 'src/constants/constants';
import {
  addEducations,
  addExperiences,
  addLanguage,
  Education,
  Experience,
  importLinkedin,
  LanguageCode,
  ProjectType,
} from 'src/core/api';
import { v4 as uuidv4 } from 'uuid';

import { AdaptorRes, SuccessRes } from '..';
import { ImportLinkedInRes } from './index.types';

export const getLinkedinProfileAdaptor = async (file: File): Promise<AdaptorRes<ImportLinkedInRes>> => {
  try {
    const res = await importLinkedin(file);
    const data = {
      languages: (res.body.Languages || []).map(language => ({
        id: uuidv4(),
        name: Object.entries(Languages).find(([_, val]) => val === language.name)?.[0] as LanguageCode,
        level: LinkedInLanguageLevel[language.level],
      })),
      educations: (res.body.educations || []).map(education => ({
        id: uuidv4(),
        title: education.name,
        degree: education.degree,
        grade: education.grade,
        org_id: education.organization.id,
        org: education.organization,
        start_at: education?.start_at || '',
        end_at: education?.end_at || '',
      })) as Education[],
      experiences: (res.body.experiences || []).map(experience => ({
        id: uuidv4(),
        title: experience.job,
        description: experience.descriptions,
        city: experience.location.split(',')[0],
        country: experience.location.split(',')[1],
        employment_type: 'FULL_TIME',
        org_id: experience.company.id,
        org: experience.company,
        start_at: experience.start_date?.toString() || '',
        end_at: experience.end_date?.toString() || '',
      })) as Experience[],
    };
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting LinkedIn Profile: ', error);
    return { data: null, error: 'Error in getting LinkedIn Profile' };
  }
};

export const applyLinkedInProfileAdaptor = async (linkedin: ImportLinkedInRes): Promise<AdaptorRes<SuccessRes>> => {
  const { experiences = [], educations = [], languages = [] } = linkedin || {};
  try {
    await Promise.all([
      experiences.map(experience => {
        const payload = {
          org_id: experience.org_id,
          title: experience.title,
          description: experience.description,
          start_at: new Date(experience.start_at).toISOString(),
          end_at: experience.end_at ? new Date(experience.end_at).toISOString() : '',
          country: experience.country,
          city: experience.city,
          employment_type: experience.employment_type || ('FULL_TIME' as ProjectType),
        };
        addExperiences(payload);
      }),
      educations.map(education => {
        const payload = {
          org_id: education.org_id,
          title: education.title,
          description: education.description,
          degree: education.degree,
          grade: education.grade,
          start_at: new Date(education.start_at).toISOString(),
          end_at: education.end_at ? new Date(education.end_at).toISOString() : '',
        };
        addEducations(payload);
      }),
      languages.map(language => {
        const payload = {
          name: language.name,
          level: language.level,
        };
        addLanguage(payload);
      }),
    ]);
    return { data: { message: 'success' }, error: null };
  } catch (error) {
    console.error('Error in applying LinkedIn Profile: ', error);
    return { data: null, error: 'Error in applying LinkedIn Profile' };
  }
};
