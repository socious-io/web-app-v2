import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import { get, post } from 'src/core/http';
import { CategoriesResp, Cities, CreatePostPayload, Pagination } from 'src/core/types';
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

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
}

export async function getCityList(countryCode: string): Promise<Pagination<Cities[]>> {
  return get(`/geo/locations/country/${countryCode}?limit=301000`).then(({ data }) => data);
}

export async function createPost(payload: CreatePostPayload) {
  return post('/projects', payload).then(({ data }) => data);
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
