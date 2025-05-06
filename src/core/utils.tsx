import { t } from 'i18next';

export const translate = t;

import { Credential, Identity, OrgMeta, Organization, SearchReq, User, UserMeta } from './api';
import { UserType } from './types';

export function when<T, P>(value: unknown, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

export function printWhen(content: unknown, conditions: boolean | undefined | null): JSX.Element {
  return conditions ? <>{content}</> : <></>;
}

export const removedEmptyProps = (obj: Record<string | number, unknown> | unknown) => {
  if (!obj) return obj;
  if (obj instanceof FormData) return obj;
  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (value) {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const removeEmptyArrays = (obj: null | undefined | Record<string | number, unknown>) => {
  if (!obj) {
    return;
  }

  return Object.entries(obj).reduce((prev, [key, value]) => {
    if (!Array.isArray(value) || !(value.length === 0)) Object.assign(prev, { [key]: value });

    return prev;
  }, {});
};

export const removeValuesFromObject = (obj: any, valuesToRemove: Array<string | null | undefined | number>) => {
  const output: any = {};
  for (const key in obj) {
    if (!valuesToRemove.includes(obj[key])) {
      output[key] = obj[key];
    }
  }
  return output;
};

export const checkUsernameConditions = (username: string) => {
  if (!username) return;
  if (!/^[a-z0-9._-]+$/.test(username)) return translate('onboarding-username-error-letters');
  if (username.startsWith('.') || username.startsWith('_')) return translate('onboarding-username-error-start');
  if (/[._]{2,}/.test(username)) return translate('onboarding-username-error-consecutive');
  if (username.length < 6 || username.length > 24) return translate('onboarding-username-error-length');
};

export const getIdentityMeta = (identity: User | Organization | Identity | UserMeta | OrgMeta | undefined) => {
  if (!identity)
    return {
      username: '',
      usernameVal: '',
      name: '',
      profileImage: undefined,
      type: undefined,
      website: undefined,
    };
  // if type of identity is 'Identity'

  if ('identity_meta' in identity) {
    if (identity.identity_type === 'users') {
      const user = identity.identity_meta as UserMeta;
      return {
        username: `@${user.username}`,
        usernameVal: user.username,
        name: user.name,
        profileImage: user.avatar,
        type: identity.identity_type,
        website: undefined,
      };
    }
    const org = identity.identity_meta as OrgMeta;
    return {
      username: `@${org.shortname}`,
      usernameVal: org.shortname,
      name: org.name,
      profileImage: org.image,
      type: identity.identity_type,
      website: undefined,
    };
  }

  if ('meta' in identity) {
    // 'organizations' | 'users';
    if (identity.type === 'users') {
      const user = identity.meta as UserMeta;
      return {
        username: `@${user.username}`,
        usernameVal: user.username,
        name: user.name,
        profileImage: user.avatar,
        type: identity.type,
        website: undefined,
      };
    }
    const org = identity.meta as OrgMeta;
    return {
      username: `@${org.shortname}`,
      usernameVal: org.shortname,
      name: org.name,
      profileImage: org.image,
      type: identity.type,
      website: undefined,
    };
  }

  // if identity type is 'User'
  if ('first_name' in identity || 'username' in identity) {
    const user = identity as User;
    return {
      username: `@${user.username}`,
      usernameVal: user.username,
      name: user.name || `${user?.first_name || ''} ${user?.last_name || ''}`,
      profileImage: user.avatar?.url || (user.avatar && String(user.avatar)) || '',
      type: 'users' as Identity['type'],
      website: undefined,
    };
  }

  // if identity type is 'Organization'
  const org = identity as Organization;
  return {
    username: `@${org.shortname}`,
    usernameVal: org.shortname,
    name: org.name,
    profileImage: org.image?.url || (org.image && String(org.image)) || '',
    type: 'organizations' as Identity['type'],
    website: org.website,
  };
};

export const verificationStatus: Record<Credential['status'], 'verified' | 'unverified' | 'pending'> = {
  APPROVED: 'verified',
  SENT: 'verified',
  CLAIMED: 'verified',
  PENDING: 'pending',
  REJECTED: 'unverified',
  ISSUED: 'verified',
};

export const navigateToProfile = (username: string, type: UserType) => {
  const usernameVal = username.replaceAll('@', '');
  if (username) {
    if (type === 'users') window.location.href = `/profile/users/${usernameVal}/view`;
    else window.location.href = `/profile/organizations/${usernameVal}/view`;
  }
};

export const checkSearchFilters = (
  type: 'organizations' | 'projects' | 'users' | 'posts' | 'services',
  filter: Record<string, any>,
) => {
  let authorizedKeys: string[] = [];
  switch (type) {
    case 'organizations':
      authorizedKeys = ['social_causes', 'city', 'country'];
      break;
    case 'projects':
      authorizedKeys = [
        'causes_tags',
        'city',
        'country',
        'experience_level',
        'job_category_id',
        'payment_type',
        'project_length',
        'remote_preference',
        'skills',
      ];
      break;
    case 'users':
      authorizedKeys = ['social_causes', 'city', 'country', 'skills', 'events', 'languages.name'];
      break;
    case 'posts':
      authorizedKeys = ['causes_tags', 'hashtags', 'identity_tags', 'identity_id'];
      break;
    case 'services':
      authorizedKeys = ['city', 'country', 'job_category_id', 'project_length', 'remote_preference', 'skills'];
  }

  const authorizedFilters: Record<string, any> = {};
  Object.keys(filter).forEach(key => {
    if (authorizedKeys.includes(key)) {
      authorizedFilters[key] = filter[key];
    }
  });

  return authorizedFilters;
};

export const addFiltersToSearch = (payload: SearchReq) => {
  if (payload.type === 'services') {
    const newPayload: SearchReq = { ...payload, type: 'projects', filter: { ...payload.filter, kind: 'SERVICE' } };
    return newPayload;
  }
  if (payload.type === 'projects') {
    const newPayload: SearchReq = { ...payload, type: 'projects', filter: { ...payload.filter, kind: 'JOB' } };
    return newPayload;
  }
  return payload;
};
