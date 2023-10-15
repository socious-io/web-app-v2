import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { cities, CityRes, createJob, jobCategories, JobCategoriesRes, JobReq } from 'src/core/api';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import {
  setMaxRange,
  setMinRange,
  setPostCity,
  setPostCountry,
  setPostDescriptionTitle,
  setPostExperienceLevel,
  setPostJobCategoryId,
  setPostProjectLength,
  setPostProjectType,
  setPostRemotePreference,
  setPostTitle,
} from 'src/store/reducers/createPostWizard.reducer';

import { formModel } from './info.form';

export async function getJobCategories(): Promise<JobCategoriesRes> {
  return jobCategories();
}

export async function getCityList(countryCode: string): Promise<CityRes> {
  return cities(countryCode);
}

export async function createPost(payload: JobReq) {
  return createJob(payload);
}

export function updateForm(dispatch: Dispatch<AnyAction>) {
  return (fieldName: keyof ReturnType<typeof formModel>, value: ControlPrimitiveValue) => {
    switch (fieldName) {
      case 'title':
        dispatch(setPostTitle(value));
        break;
      case 'job_category_id':
        dispatch(setPostJobCategoryId(value));
        break;
      case 'description':
        dispatch(setPostDescriptionTitle(value));
        break;
      case 'country':
        dispatch(setPostCountry(value));
        break;
      case 'city':
        dispatch(setPostCity(value));
        break;
      case 'remote_preference':
        dispatch(setPostRemotePreference(value));
        break;
      case 'project_type':
        dispatch(setPostProjectType(value));
        break;
      case 'project_length':
        dispatch(setPostProjectLength(value));
        break;
      case 'experience_level':
        dispatch(setPostExperienceLevel(value));
        break;
      case 'payment_range_lower':
        dispatch(setMinRange(value));
        break;
      case 'payment_range_higher':
        dispatch(setMaxRange(value));
        break;
    }
  };
}
