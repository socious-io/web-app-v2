import { AnyAction } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { get, post } from 'src/core/http';
import { formModel } from './info.form';
import {
  CreatePostWizard,
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
import { CategoriesResp, Cities, CreatePostPayload, Pagination } from 'src/core/types';
import { ControlPrimitiveValue } from 'src/core/form/useForm/useForm.types';
import { Job } from '@organisms/job-list/job-list.types';

export async function getJobCategories(): Promise<CategoriesResp> {
  return get('/projects/categories').then(({ data }) => data);
}

export async function getCityList(countryCode: string): Promise<Pagination<Cities[]>> {
  return get(`/geo/locations/country/${countryCode}?limit=301000`).then(({ data }) => data);
}
export function createFormInitState(data: Job): CreatePostWizard {
  return {
    title: data.title || '',
    description: data.description || '',
    remote_preference: data.remote_preference || '',
    country: data.country || '',
    project_type: data.project_type || '',
    project_length: data.project_length || '',
    payment_type: data.payment_type || 'PAID',
    causes_tags: data.causes_tags || [],
    skills: data.skills || [],
    status: data.status || 'ACTIVE',
    experience_level: data.experience_level || 0,
    job_category_id: data.job_category_id || '',
    payment_scheme: data.payment_scheme || 'FIXED',
    city: data.city || '',
    payment_currency: data.payment_currency || 'USD',
    payment_range_lower: data.payment_range_lower || '',
    payment_range_higher: data.payment_range_higher || '',
  };
}
export async function jobEditRequest(id: string, payload: CreatePostPayload) {
  return post(`/projects/update/${id}`, payload).then(({ data }) => data);
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
