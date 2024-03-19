import { useEffect, useReducer, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { JobCategoriesRes, Location, searchLocation } from 'src/core/api';
import { Item } from 'src/Nowruz/modules/general/components/CheckboxGroup/index.types';
import { MultiSelectItem } from 'src/Nowruz/modules/general/components/multiSelect/multiSelect.types';
import { FilterReq } from 'src/Nowruz/pages/search/useSearch';

import { filtersReducer, initialFilters } from './filtersReducer';

type LabelValue = { label: string; value: string };

export const useFilterSlider = (onApply: (filter: FilterReq) => void, filter: FilterReq, type: string) => {
  const categoriesList = useRef<LabelValue[] | null>(null);
  const { categories } = (useLoaderData() as { jobCategories: JobCategoriesRes }).jobCategories || {};
  const [filters, dispatch] = useReducer(filtersReducer, initialFilters);
  const [causesItems, setCausesItems] = useState<LabelValue[]>([]);
  const [skillItems, setSkillItems] = useState<LabelValue[]>([]);
  categoriesList.current = categories.map((item) => ({ label: item.name, value: item.id }));
  const paymentTypeOptions = PROJECT_PAYMENT_TYPE.slice().reverse();

  const getOptionsFromValues = (values: string[], options: LabelValue[]) =>
    options.filter((option) => values.includes(option.value));

  const cityToOption = (cities: Location[]) => {
    if (!cities.length) return;
    return cities.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.region_name}`,
      countryCode: city.country_code,
    }));
  };

  const searchCities = async (searchText: string, cb: any) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectMultiSelect = (type: 'causes' | 'skills', value: MultiSelectItem[]) => {
    dispatch({ type, payload: value });
  };

  const onSelectCity = (location: { value: number; label: string; countryCode: string }) => {
    const { value, label, countryCode } = location || {};
    dispatch({ type: 'location', payload: { label, value, countryCode } });
  };

  const onSelectCheckboxs = (type: 'organizationSize' | 'jobLength' | 'experienceLevel', value: Item[]) => {
    dispatch({ type, payload: value });
  };

  const onSelectSearchDropdown = (type: 'preference' | 'jobCategory', value: { label: string; value: string }) => {
    dispatch({ type, payload: value });
  };

  const onSelectPaymentType = (value: { label: string; value: string }) => {
    dispatch({ type: 'paymentType', payload: value });
  };

  const handleApply = () => {
    const {
      causes,
      skills,
      // organizationSize,
      location,
      preference,
      jobCategory,
      jobLength,
      experienceLevel,
      paymentType,
    } = filters || {};
    const { value, label, countryCode } = location || {};
    const isValidLocation = countryCode && label && value;

    const filter = {
      ...(causes.length > 0 && { causes_tags: causes.map((c: LabelValue) => c.value) }),
      ...(skills.length > 0 && { skills: skills.map((s: LabelValue) => s.value) }),
      // ...(organizationSize.length > 0 && { organizationSize: organizationSize.map((o: LabelValue) => o.value) }),
      ...(countryCode && { country: [countryCode] }),
      ...(label && { city: [label.split(',')[0]] }),
      ...(isValidLocation && {
        location: { value, label, countryCode },
      }),
      ...(preference && { remote_preference: preference.value }),
      ...(jobCategory && { job_category_id: jobCategory.value }),
      ...(jobLength.length > 0 && { project_length: jobLength.map((j: LabelValue) => j.value) }),
      ...(experienceLevel.length > 0 && { experience_level: experienceLevel.map((e: LabelValue) => e.value) }),
      ...(paymentType && { payment_type: type !== 'organization' ? paymentType.value : '' }),
    };
    onApply(filter);
  };

  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => setSkillItems(data));
    setCausesItems(socialCausesToCategoryAdaptor());
  }, []);

  useEffect(() => {
    if (filter.causes_tags?.length) {
      dispatch({ type: 'causes', payload: getOptionsFromValues(filter.causes_tags || [], causesItems) });
    }
    if (type !== 'organization' && filter.skills?.length) {
      dispatch({ type: 'skills', payload: getOptionsFromValues(filter.skills ?? [], skillItems) });
    }
    if (filter.location) {
      dispatch({ type: 'location', payload: filter.location });
    }
    if (filter.remote_preference) {
      dispatch({
        type: 'preference',
        payload: PROJECT_REMOTE_PREFERENCES_V2.find((p) => p.value === filter.remote_preference),
      });
    }
    if (filter.job_category_id) {
      dispatch({
        type: 'jobCategory',
        payload: categoriesList?.current?.find((c) => c.value === filter.job_category_id),
      });
    }
    if (filter.project_length?.length) {
      dispatch({ type: 'jobLength', payload: getOptionsFromValues(filter.project_length || [], PROJECT_LENGTH_V2) });
    }
    if (filter.experience_level?.length) {
      dispatch({
        type: 'experienceLevel',
        payload: getOptionsFromValues(filter.experience_level || [], EXPERIENCE_LEVEL_V2),
      });
    }
    if (filter.payment_type) {
      dispatch({
        type: 'paymentType',
        payload: PROJECT_PAYMENT_TYPE.find((p) => p.value === filter.payment_type),
      });
    }
  }, [
    causesItems,
    filter.causes_tags,
    filter.skills,
    filter.location,
    filter.remote_preference,
    filter.job_category_id,
    filter.project_length,
    filter.experience_level,
    filter.payment_type,
    skillItems,
    type,
  ]);

  return {
    data: {
      filters,
      causesItems,
      skillItems,
      categoriesList: categoriesList.current,
      paymentTypeOptions,
    },
    operations: {
      onSelectMultiSelect,
      searchCities,
      onSelectCity,
      onSelectCheckboxs,
      onSelectSearchDropdown,
      onSelectPaymentType,
      handleApply,
    },
  };
};
