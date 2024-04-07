import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT_TYPE } from 'src/constants/PROJECT_TYPES';
import {
  Experience,
  ExperienceReq,
  Location,
  Organization,
  User,
  addExperiences,
  createOrganization,
  jobCategories as jobCategoriesApi,
  otherProfileByUsername,
  removeExperiences,
  search,
  searchLocation,
  updateExperiences,
} from 'src/core/api';
import { monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    title: yup
      .string()
      .trim()
      .required('Required')
      .min(2, 'Must be 2-50 characters')
      .max(50, 'Must be 2-50 characters'),
    jobCategory: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    org: yup.object().shape({
      label: yup.string().required('Required').min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters'),
      value: yup.string(),
    }),
    city: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    country: yup.string(),
    volunteer: yup.boolean(),
    employmentType: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    currentlyWorking: yup.boolean(),
    startMonth: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    startYear: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    endMonth: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    endYear: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}
export const useCreateUpdateExperience = (handleClose: () => void, experience?: Experience) => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const dispatch = useDispatch();
  const [jobCategories, setJobCategories] = useState<OptionType[]>();
  const [employmentTypes, setEmploymentTypes] = useState<OptionType[]>();
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [dateError, setDateError] = useState('');

  const getJobCategories = async () => {
    const res = await jobCategoriesApi();
    const options = res.categories.map(item => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setJobCategories(options);
    if (experience)
      setValue('jobCategory', {
        value: experience.job_category_id,
        label: options.find(item => item.value === experience.job_category_id)?.label,
      });
    else setValue('jobCategory', { label: '', value: '' });
  };

  const mapEmploymentTypes = () => {
    const types = PROJECT_TYPE.map(item => {
      return {
        value: item.value,
        label: item.title,
      };
    });
    setEmploymentTypes(types);
  };

  const mapMonthNames = () => {
    const options = monthNames.map((m, index) => {
      return { value: index.toString(), label: m };
    });
    setMonths(options);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const start = currentYear - 30;
    const options: OptionType[] = [];
    for (let i = currentYear; i >= start; i--) {
      const year = i.toString();
      options.push({ value: year, label: year });
    }

    setYears(options);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    const startDate = experience?.start_at ? new Date(experience.start_at) : undefined;
    const endDate = experience?.end_at ? new Date(experience.end_at) : undefined;

    const empTypeLabel = experience ? PROJECT_TYPE.find(t => t.value === experience.employment_type)?.title : undefined;

    const initialVal = {
      title: experience?.title || '',
      jobCategories: {
        label: experience?.job_category?.name || '',
        value: experience?.job_category?.id || '',
      },
      orgName: experience?.org.name || '',
      orgId: experience?.org.id || '',
      city: { value: '', label: experience?.city || experience?.org.city || '' },
      country: experience?.country || '',
      startMonth: {
        label: startDate ? monthNames[startDate.getMonth()] : '',
        value: startDate ? startDate.getMonth() : '',
      },
      startYear: { label: startDate?.getFullYear() || '', value: startDate?.getFullYear() || '' },
      endMonth: { label: endDate ? monthNames[endDate.getMonth()] : '', value: endDate ? endDate.getMonth() : '' },
      endYear: { label: endDate?.getFullYear() || '', value: endDate?.getFullYear() || '' },
      description: experience?.description || '',
      currentlyWorking: experience ? !experience?.end_at : false,
      org: {
        value: experience?.org_id || '',
        label: experience?.org.name || '',
      },
      employmentType: { value: experience?.employment_type || '', label: empTypeLabel },
    };
    reset(initialVal);
  };

  const startMonth = watch('startMonth');
  const endMonth = watch('endMonth');
  const startYear = watch('startYear');
  const endYear = watch('endYear');
  const currentlyWorking = watch('currentlyWorking');

  const validateDates = () => {
    if (!currentlyWorking && !endYear?.label) {
      return 'Select currently working or enter end year';
    }
    if (!startYear?.label) return;
    const start = new Date(Number(startYear?.label), Number(startMonth?.value || 0), 2);
    let end = new Date();
    if (!currentlyWorking) {
      if (!endYear?.label) return;
      end = new Date(Number(endYear?.label), Number(endMonth?.value || 0), 2);
    }
    if (end < start) return 'Start date cannot be later than end date';
    return;
  };

  useEffect(() => {
    const msg = validateDates();
    if (msg) {
      setDateError(msg);
    } else setDateError('');
  }, [startMonth, startYear, endMonth, endYear, currentlyWorking]);

  useEffect(() => {
    getJobCategories();
    mapEmploymentTypes();
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [experience]);

  const onChangeCategory = (newCategory: OptionType) => {
    setValue('jobCategory', newCategory, { shouldValidate: true });
  };
  const orgToOption = (orgs: Organization[], searchText: string) => {
    let options: OptionType[] = [];
    options = orgs.map(org => ({
      value: org.id,
      label: org.name,
      icon: org.image ? (
        <img src={org.image.url} width={24} height={24} alt="" />
      ) : (
        <Avatar type="organizations" size="24px" />
      ),
    }));
    return options;
  };

  const searchCompanies = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await search({ type: 'organizations', q: searchText, filter: {} }, { page: 1, limit: 10 });
        cb(orgToOption(response.items, searchText));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectCompany = (newCompanyVal: OptionType) => {
    const value = newCompanyVal.value === newCompanyVal.label ? '' : newCompanyVal.value;
    setValue('org', { value, label: newCompanyVal.label }, { shouldValidate: true });
  };

  const cityToOption = (cities: Location[]) => {
    return cities.map(city => ({
      value: city.id,
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      city: city.name,
      countryCode: city.country_code,
    }));
  };

  const searchCities = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await searchLocation(searchText);
        cb(cityToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };
  const onSelectCity = location => {
    setValue('city', { value: location.city, label: location.city }, { shouldValidate: true });
    setValue('country', location.countryCode, { shouldValidate: true });
  };

  const onSelectEmplymentType = (newType: OptionType) => {
    setValue('employmentType', newType, { shouldValidate: true });
  };

  const onSelectStartMonth = (month: OptionType) => {
    setValue('startMonth', month, { shouldValidate: true });
  };
  const onSelectEndMonth = (month: OptionType) => {
    setValue('endMonth', month, { shouldValidate: true });
  };
  const onSelectStartYear = (year: OptionType) => {
    setValue('startYear', year, { shouldValidate: true });
  };
  const onSelectEndYear = (year: OptionType) => {
    setValue('endYear', year, { shouldValidate: true });
  };

  const handleCheckWorking = (value: boolean) => {
    setValue('currentlyWorking', value, { shouldValidate: true });

    if (value) {
      setValue('endMonth', { label: '', value: '' });
      setValue('endYear', { label: '', value: '' });
    }
  };

  const handleCheckVolunteer = (value: boolean) => {
    setValue('volunteer', value, { shouldValidate: true });
  };
  const onSave = async () => {
    if (dateError) return;
    const {
      org,
      title,
      description,
      startYear,
      startMonth,
      jobCategory,
      endYear,
      endMonth,
      country,
      city,
      employmentType,
      currentlyWorking,
      volunteer,
    } = getValues();

    let organizationId = org.value;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: org.label, email: 'org@socious.io' }, false)).id;
    }

    const startDate = new Date(Number(startYear.value), Number(startMonth.value || 0), 1).toISOString();

    let payload: ExperienceReq = {
      org_id: organizationId,
      title,
      description,
      start_at: startDate,
      job_category_id: jobCategory.value,
      country,
      city: city.label,
    };
    if (employmentType.value) payload.employment_type = employmentType.value;
    if (!currentlyWorking && endYear.value) {
      const endDate = new Date(Number(endYear.value), Number(endMonth.value || 0), 1).toISOString();
      payload.end_at = endDate;
    }

    payload = removedEmptyProps(payload);
    if (experience) await updateExperiences(experience.id, payload);
    else await addExperiences(payload);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    handleClose();
  };

  const onDelete = async () => {
    if (!experience) return;
    await removeExperiences(experience.id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    handleClose();
  };
  return {
    jobCategories,
    register,
    handleSubmit,
    errors,
    category: getValues().jobCategory,
    onChangeCategory,
    companyVal: getValues().org,
    searchCompanies,
    onSelectCompany,
    cityVal: getValues().city,
    searchCities,
    onSelectCity,
    employmentTypeVal: getValues().employmentType,
    employmentTypes,
    onSelectEmplymentType,
    years,
    months,
    startMonth: getValues().startMonth,
    startYear: getValues().startYear,
    endMonth: getValues().endMonth,
    endYear: getValues().endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    currentlyWorking: getValues().currentlyWorking,
    volunteer: getValues().volunteer,
    handleCheckWorking,
    handleCheckVolunteer,
    onSave,
    onDelete,
    dateError,
  };
};
