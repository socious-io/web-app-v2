import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { PROJECT_TYPE } from 'src/constants/PROJECT_TYPES';
import { getUserByUsernameAdaptor } from 'src/core/adaptors';
import {
  Experience,
  ExperienceReq,
  Location,
  Organization,
  ProjectType,
  User,
  addExperiences,
  createOrganization,
  jobCategories as jobCategoriesApi,
  removeExperiences,
  searchLocation,
  updateExperiences,
} from 'src/core/api';
import { monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import { v4 as uuidv4 } from 'uuid';
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
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    startYear: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    endMonth: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .when('currentlyWorking', {
        is: true,
        then: schema =>
          schema.shape({
            label: yup.string(),
            value: yup.string(),
          }),
        otherwise: schema =>
          schema.shape({
            label: yup.string().required('Required'),
            value: yup.string(),
          }),
      }),
    endYear: yup
      .object()
      .shape({
        label: yup.string(),
        value: yup.string(),
      })
      .when('currentlyWorking', {
        is: true,
        then: schema =>
          schema.shape({
            label: yup.string(),
            value: yup.string(),
          }),
        otherwise: schema =>
          schema.shape({
            label: yup.string().required('Required'),
            value: yup.string(),
          }),
      }),
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}
export const useCreateUpdateExperience = (
  handleClose: () => void,
  experience?: Experience,
  onAddExperience?: (experience: Experience, isEdit: boolean) => void,
) => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const dispatch = useDispatch();
  const [jobCategories, setJobCategories] = useState<OptionType[]>();
  const [companies, setCompanies] = useState<Organization[]>([]);
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
        value: experience.job_category?.id,
        label: experience.job_category?.name,
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
    const start = 1970;
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
  const startDateErrors = errors['startMonth']?.label?.message || errors['startYear']?.label?.message;
  const endDateErrors = errors['endMonth']?.label?.message || errors['endYear']?.label?.message || dateError;

  const initializeValues = () => {
    //FIXME: start_at and end_at from BE, not in UTC version
    const getUTCDate = (date: string) => (date.endsWith('Z') ? date : `${date}Z`);
    const startDate = experience?.start_at ? new Date(getUTCDate(experience.start_at)) : undefined;
    const endDate = experience?.end_at ? new Date(getUTCDate(experience.end_at)) : undefined;

    const empTypeLabel = experience ? PROJECT_TYPE.find(t => t.value === experience.employment_type)?.title : undefined;

    const initialVal = {
      title: experience?.title || '',
      jobCategory: {
        label: experience?.job_category?.name || '',
        value: experience?.job_category?.id || '',
      },
      orgName: experience?.org.name || '',
      orgId: experience?.org.id || '',
      city: { value: '', label: experience?.city || experience?.org.city || '' },
      country: experience?.country || '',
      startMonth: {
        label: startDate ? monthNames[startDate.getMonth()] : '',
        value: startDate ? startDate.getMonth().toString() : '',
      },
      startYear: { label: startDate?.getFullYear().toString() || '', value: startDate?.getFullYear().toString() || '' },
      endMonth: {
        label: endDate ? monthNames[endDate.getMonth()] : '',
        value: endDate ? endDate.getMonth().toString() : '',
      },
      endYear: { label: endDate?.getFullYear().toString() || '', value: endDate?.getFullYear().toString() || '' },
      description: experience?.description || '',
      currentlyWorking: experience ? !experience?.end_at : false,
      org: {
        value: experience?.org.id || '',
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
    const current = new Date();
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
    if (end > current || start > current) return 'Selected date cannot be later than current date';
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

  const onChangeCategory = newCategory => {
    setValue('jobCategory', newCategory, { shouldValidate: true });
  };

  const onSelectCompany = newCompanyVal => {
    const value = newCompanyVal?.value === newCompanyVal?.label ? '' : newCompanyVal?.value;
    setValue('org', { value, label: newCompanyVal?.label }, { shouldValidate: true });
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
    setValue('city', { value: location?.city, label: location?.city }, { shouldValidate: true });
    setValue('country', location?.countryCode, { shouldValidate: true });
  };

  const onSelectEmplymentType = newType => {
    setValue('employmentType', newType, { shouldValidate: true });
  };

  const onSelectStartMonth = month => {
    setValue('startMonth', month, { shouldValidate: true });
  };
  const onSelectEndMonth = month => {
    setValue('endMonth', month, { shouldValidate: true });
  };
  const onSelectStartYear = year => {
    setValue('startYear', year, { shouldValidate: true });
  };
  const onSelectEndYear = year => {
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
    if (employmentType.value) payload.employment_type = employmentType.value as ProjectType;
    if (!currentlyWorking && endYear.value) {
      const endDate = new Date(Number(endYear.value), Number(endMonth.value || 0), 1).toISOString();
      payload.end_at = endDate;
    }

    payload = removedEmptyProps(payload) as ExperienceReq;
    if (onAddExperience) {
      onAddExperience(
        {
          ...payload,
          job_category: jobCategory.value ? { id: jobCategory.value || '', name: jobCategory.label || '' } : undefined,
          org: (companies?.find(company => company.id === organizationId) as Organization) || experience?.org,
          id: experience ? experience.id : uuidv4(),
        },
        !!experience,
      );
    } else {
      if (experience) await updateExperiences(experience.id, payload);
      else await addExperiences(payload);
      if (!user?.username) return;
      const { data: updatedUser } = await getUserByUsernameAdaptor(user.username);
      dispatch(setIdentity(updatedUser));
      dispatch(setIdentityType('users'));
    }
    handleClose();
  };

  const onDelete = async () => {
    if (!experience) return;
    await removeExperiences(experience.id);
    if (!user?.username) return;
    const { data: updatedUser } = await getUserByUsernameAdaptor(user.username);
    dispatch(setIdentity(updatedUser));
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
    startDateErrors,
    endDateErrors,
    setCompanies,
  };
};
