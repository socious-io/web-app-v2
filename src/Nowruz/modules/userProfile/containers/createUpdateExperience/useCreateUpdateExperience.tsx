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
  jobCategories as jobCategoriesApi,
  otherProfileByUsername,
  removeExperiences,
  search,
  searchLocation,
  updateExperiences,
} from 'src/core/api';
import { getMonthName, monthNames } from 'src/core/time';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';
import { setUser } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required('Add your job title'),
    jobCategory: yup.string().required('job category is required'),
    orgName: yup.string().required('company is required'),
    orgId: yup.string(),
    city: yup.string().required('city is required'),
    country: yup.string(),
    employmentType: yup.string(),
    startMonth: yup.string().required('Start date is required'),
    startYear: yup.string().required('Start year is required'),
    endMonth: yup.string(),
    endYear: yup.string(),
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}
export const useCreateUpdateExperience = (handleClose: () => void, experience?: Experience) => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const dispatch = useDispatch();
  const [jobCategories, setJobCategories] = useState<OptionType[]>();
  const [category, setCategory] = useState<OptionType>();
  const [companyVal, setCompanyVal] = useState<OptionType>();
  const [cityVal, setCityVal] = useState<OptionType>();
  const [employmentTypes, setEmploymentTypes] = useState<OptionType[]>();
  const [employmentTypeVal, setEmploymentTypeVal] = useState<OptionType>();
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);

  const [startMonth, setStartMonth] = useState<OptionType>();
  const [startYear, setStartYear] = useState<OptionType>();
  const [endMonth, setEndMonth] = useState<OptionType>();
  const [endYear, setEndYear] = useState<OptionType>();
  const [currentlyWorking, setCurrentlyWorking] = useState(false);

  const getJobCategories = async () => {
    const res = await jobCategoriesApi();
    const options = res.categories.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });
    setJobCategories(options);
    if (experience) {
      setValue('jobCategory', experience.jobCategoryId || '');
      setCategory({
        label: res.categories.find((c) => c.id === experience.jobCategoryId)?.name || '',
        value: experience.jobCategoryId || '',
      });
    }
  };

  const mapEmploymentTypes = () => {
    const types = PROJECT_TYPE.map((item) => {
      return {
        value: item.value,
        label: item.title,
      };
    });
    setEmploymentTypes(types);
    if (experience) {
      setEmploymentTypeVal({
        label: PROJECT_TYPE.find((t) => t.value === experience.employmentType)?.title || '',
        value: experience.employmentType || '',
      });
    }
  };

  const mapMonthNames = () => {
    const options = monthNames.map((m, index) => {
      return { value: index.toString(), label: m };
    });
    setMonths(options);
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const start = currentYear - 40;
    const options: OptionType[] = [];
    for (let i = start; i <= currentYear; i++) {
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
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const initializeValues = () => {
    setValue('title', experience?.title || '');
    setValue('jobCategory', experience?.jobCategoryId || '');
    setValue('orgName', experience?.org.name || '');
    setValue('orgId', experience?.org.id || '');
    setValue('city', experience?.city || experience?.org.city || '');
    setValue('country', experience?.country || '');
    setValue('employmentType', experience?.employmentType || '');
    setValue('startMonth', experience?.start_at ? new Date(experience.start_at).getMonth().toString() : '');
    setValue('startYear', experience?.start_at ? new Date(experience.start_at).getFullYear().toString() : '');
    setValue('endMonth', experience?.end_at ? new Date(experience.end_at).getMonth().toString() : '');
    setValue('endYear', experience?.end_at ? new Date(experience.end_at).getFullYear().toString() : '');
    setValue('description', experience?.description || '');

    const startDate = experience?.start_at ? new Date(experience.start_at) : new Date();
    const startMonthValue = experience?.start_at ? startDate.getMonth().toString() : '';
    const startMonthLabel = experience?.start_at ? getMonthName(startMonthValue) : '';
    const startYear = experience?.start_at ? startDate.getFullYear().toString() : '';

    const endDate = experience?.end_at ? new Date(experience.end_at) : new Date();
    const endMonthValue = experience?.end_at ? endDate.getMonth().toString() : '';
    const endMonthLabel = experience?.end_at ? getMonthName(endMonthValue) : '';
    const endYear = experience?.end_at ? endDate.getFullYear().toString() : '';

    setStartMonth({ value: startMonthValue, label: startMonthLabel });
    setStartYear({ value: startYear, label: startYear });
    setEndMonth({ value: endMonthValue, label: endMonthLabel });
    setEndYear({ value: endYear, label: endYear });
    setCurrentlyWorking(experience ? !experience?.end_at : false);

    setCompanyVal({
      value: experience?.org_id || '',
      label: experience?.org.name || '',
    });
    setCityVal({ value: '', label: experience?.city || experience?.org.city || '' });
  };

  useEffect(() => {
    getJobCategories();
    mapEmploymentTypes();
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [experience]);

  const onChangeCategory = (newCategory: OptionType) => {
    setValue('jobCategory', newCategory.value, { shouldValidate: true });
    setCategory(newCategory);
  };
  const orgToOption = (orgs: Organization[], searchText: string) => {
    let options: OptionType[] = [];
    if (!orgs.length) options = options.concat({ value: '', label: searchText });
    options = options.concat(
      orgs.map((org) => ({
        value: org.id,
        label: org.name,
        icon: org.image ? (
          <img src={org.image.url} width={24} height={24} alt="" />
        ) : (
          <Avatar type="organizations" size="24px" />
        ),
      })),
    );
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
    setValue('orgId', newCompanyVal.value, { shouldValidate: true });
    setValue('orgName', newCompanyVal.label, { shouldValidate: true });
    setCompanyVal({ value: newCompanyVal.value, label: newCompanyVal.label });
  };

  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      value: city.id,
      label: `${city.name}, ${city.region_name}`,
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
  const onSelectCity = (location) => {
    setValue('city', location.value, { shouldValidate: true });
    // setValue('country', location.value, { shouldValidate: true });
    setCityVal({ value: location.value, label: location.label });
  };

  const onSelectEmplymentType = (newType: OptionType) => {
    setValue('employmentType', newType.value, { shouldValidate: true });
    setEmploymentTypeVal(newType);
  };

  const onSelectStartMonth = (month: OptionType) => {
    setValue('startMonth', month.value, { shouldValidate: true });
    setStartMonth(month);
  };
  const onSelectEndMonth = (month: OptionType) => {
    setValue('endMonth', month.value, { shouldValidate: true });
    setEndMonth(month);
  };
  const onSelectStartYear = (year: OptionType) => {
    setValue('startYear', year.value, { shouldValidate: true });
    setStartYear(year);
  };
  const onSelectEndYear = (year: OptionType) => {
    setValue('endYear', year.value, { shouldValidate: true });
    setEndYear(year);
  };

  const handleCheckWorking = () => {
    const value = !currentlyWorking;
    setCurrentlyWorking(!currentlyWorking);
    if (value) {
      setValue('endMonth', undefined);
      setValue('endYear', undefined);
      setEndMonth({ label: '', value: '' });
      setEndYear({ label: '', value: '' });
    }
  };

  const onSave = async () => {
    const startDate = new Date(Number(getValues().startYear), Number(getValues().startMonth), 1).toISOString();
    const payload: ExperienceReq = {
      org_id: getValues().orgId || '',
      title: getValues().title,
      description: getValues().description,
      start_at: startDate,
    };
    if (!currentlyWorking) {
      const endDate = new Date(Number(getValues().endYear), Number(getValues().endMonth), 1).toISOString();
      payload.end_at = endDate;
    }
    if (experience) await updateExperiences(experience.id, payload);
    else await addExperiences(payload);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setUser(updated));
    handleClose();
  };

  const onDelete = async () => {
    if (!experience) return;
    await removeExperiences(experience.id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setUser(updated));
  };
  return {
    jobCategories,
    register,
    handleSubmit,
    errors,
    category,
    onChangeCategory,
    companyVal,
    searchCompanies,
    onSelectCompany,
    cityVal,
    searchCities,
    onSelectCity,
    employmentTypeVal,
    employmentTypes,
    onSelectEmplymentType,
    years,
    months,
    startMonth,
    startYear,
    endMonth,
    endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    currentlyWorking,
    handleCheckWorking,
    onSave,
    onDelete,
  };
};
