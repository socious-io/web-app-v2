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
import { setUser } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    title: yup.string().trim().required('Required'),
    jobCategory: yup.string(),
    orgName: yup.string().required('Required'),
    orgId: yup.string(),
    city: yup.string(),
    country: yup.string(),
    employmentType: yup.string().required('Required'),
    startMonth: yup.string(),
    startYear: yup.string().required('Required'),
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
  const [companies, setCompanies] = useState<Organization[]>();

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
      setValue('jobCategory', experience.job_category.id || '');
      setCategory({
        label: experience.job_category.name || '',
        value: experience.job_category.id || '',
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
        label: PROJECT_TYPE.find((t) => t.value === experience.employment_type)?.title || '',
        value: experience.employment_type || '',
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
    setValue('jobCategory', experience?.job_category?.id || '');
    setValue('orgName', experience?.org.name || '');
    setValue('orgId', experience?.org.id || '');
    setValue('city', experience?.city || experience?.org.city || '');
    setValue('country', experience?.country || '');
    setValue('employmentType', experience?.employment_type || '');
    setValue('startMonth', experience?.start_at ? new Date(experience.start_at).getMonth().toString() : '');
    setValue('startYear', experience?.start_at ? new Date(experience.start_at).getFullYear().toString() : '');
    setValue('endMonth', experience?.end_at ? new Date(experience.end_at).getMonth().toString() : '');
    setValue('endYear', experience?.end_at ? new Date(experience.end_at).getFullYear().toString() : '');
    setValue('description', experience?.description || '');

    const startDate = experience?.start_at ? new Date(experience.start_at) : new Date();
    const startMonthValue = experience?.start_at ? startDate.getMonth() : undefined;
    const startMonthLabel = startMonthValue !== undefined ? monthNames[startMonthValue] : '';
    const startYear = experience?.start_at ? startDate.getFullYear().toString() : '';

    const endDate = experience?.end_at ? new Date(experience.end_at) : new Date();
    const endMonthValue = experience?.end_at ? endDate.getMonth() : undefined;
    const endMonthLabel = endMonthValue !== undefined ? monthNames[endMonthValue] : '';
    const endYear = experience?.end_at ? endDate.getFullYear().toString() : '';

    setStartMonth({ value: (startMonthValue || '').toString(), label: startMonthLabel });
    setStartYear({ value: startYear, label: startYear });
    setEndMonth({ value: (endMonthValue || '').toString(), label: endMonthLabel });
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
        setCompanies(response.items);
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

    const org = companies?.find((item) => item.id === newCompanyVal.value);
    setValue('city', org?.city || '');
    setValue('country', org?.country || '', { shouldValidate: true });
    setCityVal({ value: '', label: org?.city || '' });
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
    setValue('city', location.label, { shouldValidate: true });
    setValue('country', location.countryCode, { shouldValidate: true });
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
    const {
      orgId,
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
      orgName,
    } = getValues();

    let organizationId = orgId;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: orgName, email: 'org@socious.io' }, false)).id;
    }
    const startDate = new Date(Number(startYear), Number(startMonth), 15).toISOString();

    let payload: ExperienceReq = {
      org_id: organizationId,
      title,
      description,
      start_at: startDate,
      job_category_id: jobCategory,
      country,
      city,
      employment_type: employmentType,
    };
    if (!currentlyWorking) {
      const endDate = new Date(Number(endYear), Number(endMonth), 3).toISOString();
      payload.end_at = endDate;
    }
    payload = removedEmptyProps(payload);
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
