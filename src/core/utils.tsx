import { Identity, OrgMeta, Organization, User, UserMeta } from './api';

export function when<T, P>(value: unknown, fn: (params?: P) => T, params?: P) {
  if (value) {
    return fn(params);
  }
}

export function printWhen(content: unknown, conditions: boolean | undefined | null): JSX.Element {
  return conditions ? <>{content}</> : <></>;
}

export const debounce = (func: Function, delay: number) => {
  let debounceTimer: NodeJS.Timeout;
  return function (...args) {
    const context = this;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

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
    if (Array.isArray(value) && value.length === 0) {
    } else {
      Object.assign(prev, { [key]: value });
    }
    return prev;
  }, {});
};

export const removeValuesFromObject = (obj: any, valuesToRemove: Array<string | null | undefined | number>) => {
  for (const key in obj) {
    if (valuesToRemove.includes(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};

export const checkUsernameConditions = (username: string) => {
  if (!username) return;
  if (!/^[a-z0-9._-]+$/.test(username)) return `Can contain lowercase letters, digits, '.', '_', and '-'.`;
  if (username.startsWith('.') || username.startsWith('_')) return "Shouldn't start with a period or underscore.";
  if (/[\._]{2,}/.test(username)) return 'No consecutive periods or underscores.';
  if (username.length < 6 || username.length > 24) return 'Must be between 6 and 24 characters.';
};

export const getIdentityMeta = (identity: User | Organization | Identity | undefined) => {
  if (!identity)
    return {
      username: '',
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
        name: user.name,
        profileImage: user.avatar,
        type: identity.type,
        website: undefined,
      };
    }
    const org = identity.meta as OrgMeta;
    return {
      username: `@${org.shortname}`,
      name: org.name,
      profileImage: org.image,
      type: identity.type,
      website: undefined,
    };
  }

  // if identity type is 'User'
  if ('first_name' in identity) {
    const user = identity as User;
    return {
      username: `@${user.username}`,
      name: `${user.first_name} ${user.last_name}`,
      profileImage: user.avatar?.url || '',
      type: 'users',
      website: undefined,
    };
  }

  // if identity type is 'Organization'
  const org = identity as Organization;
  return {
    username: `@${org.shortname}`,
    name: org.name,
    profileImage: org.image?.url || '',
    type: 'organizations',
    website: org.website,
  };
};
