import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import store from 'src/store';
import { setEvents } from 'src/store/reducers/events.reducer';
import { setSkills } from 'src/store/reducers/skills.reducer';

import { events, skills, Event } from './api';
import { CategoriesResp, Cities } from './types';
import { translate } from './utils';

export function socialCausesToCategoryAdaptor() {
  return Object.entries(SOCIAL_CAUSES).map(([, value]) => value);
}

export function socialCausesToDropdownAdaptor() {
  return Object.entries(SOCIAL_CAUSES)
    .map(([, value]) => {
      return { title: value.label, value: value.value };
    })
    .sort((a, b) => a.title.localeCompare(b.title));
}

export async function skillsToCategoryAdaptor() {
  let skillList = store.getState().skills.items;
  if (!skillList.length) {
    skillList = (await skills({ limit: 500 })).items;
    await store.dispatch(setSkills(skillList));
  }
  return skillList.map(item => {
    return {
      value: item.name,
      label: translate(item.name),
    };
  });
}

export function socialCausesToCategory(categories: string[] = []) {
  if (!categories) {
    return [];
  }
  return categories.map(cat => {
    return { label: translate(cat), value: cat };
  });
}

export function jobCategoriesToDropdown(categories: CategoriesResp['categories']) {
  return categories.map(item => {
    return {
      id: item.id,
      label: item.name,
      value: item.id,
    };
  });
}

export function citiesToCategories(cities: Cities[]) {
  return cities.map(city => {
    return {
      id: city.id,
      label: city.name,
      value: city.name,
      helperText: city.region_name,
    };
  });
}

export function skillsToCategory(skills: string[] = []) {
  try {
    return skills.map(name => {
      return { value: name, label: translate(name) };
    });
  } catch {
    return [];
  }
}

export async function eventsToCategoryAdaptor() {
  let eventList = store.getState().events.items;
  if (!eventList.length) {
    eventList = (await events({ limit: 10 })).items;
    await store.dispatch(setEvents(eventList));
  }
  return eventList.map(item => {
    return {
      value: item.id,
      label: item.title,
    };
  });
}

export function eventsToCategory(events: Event[] = []) {
  try {
    return events.map(event => {
      return { value: event.id, label: event.title };
    });
  } catch {
    return [];
  }
}
