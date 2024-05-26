import { Credential, Identity, OrgMeta, Organization, User, UserMeta } from './api';

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
  const output = {};
  for (const key in obj) {
    if (!valuesToRemove.includes(obj[key])) {
      output[key] = obj[key];
    }
  }
  return output;
};

export const checkUsernameConditions = (username: string) => {
  if (!username) return;
  if (!/^[a-z0-9._-]+$/.test(username)) return `Can contain lowercase letters, digits, '.', '_', and '-'.`;
  if (username.startsWith('.') || username.startsWith('_')) return "Shouldn't start with a period or underscore.";
  if (/[._]{2,}/.test(username)) return 'No consecutive periods or underscores.';
  if (username.length < 6 || username.length > 24) return 'Must be between 6 and 24 characters.';
};

export const getIdentityMeta = (identity: User | Organization | Identity | undefined) => {
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
      name: user.name || `${user.first_name} ${user.last_name}`,
      profileImage: user.avatar?.url || String(user.avatar) || '',
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
    profileImage: org.image?.url || String(org.image) || '',
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
};
