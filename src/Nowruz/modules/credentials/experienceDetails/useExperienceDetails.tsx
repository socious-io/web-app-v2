import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { PROJECT_TYPE } from 'src/constants/PROJECT_TYPES';
import {
  Experience,
  ExperienceReq,
  createOrganization,
  jobCategories as jobCategoriesApi,
  updateExperiences,
} from 'src/core/api';
import { getDaysInMonth, monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
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
    volunteer: yup.boolean(),
    employmentType: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    weeklyHours: yup.string().when('employmentType', {
      is: employmentType => employmentType.value === 'PART_TIME',
      then: schema => schema.required('Required'),
    }),
    startMonth: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    startDay: yup.object().shape({
      label: yup.string().required('Please indicate a day'),
      value: yup.string(),
    }),
    startYear: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    endMonth: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    endDay: yup.object().shape({
      label: yup.string().required('Please indicate a day'),
      value: yup.string(),
    }),
    endYear: yup.object().shape({
      label: yup.string().required('Required'),
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
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}
export const useExperienceDetails = (
  handleClose: () => void,
  experience: Experience,
  onUpdateExperience?: (experience: Experience) => void,
) => {
  const [jobCategories, setJobCategories] = useState<OptionType[]>();
  const [employmentTypes, setEmploymentTypes] = useState<OptionType[]>();
  const [months, setMonths] = useState<OptionType[]>([]);
  const [startDays, setStartDays] = useState<OptionType[]>([]);
  const [endDays, setEndDays] = useState<OptionType[]>([]);
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

  const getStartDayOptions = () => {
    const startYearValue = getValues().startYear?.value;
    const startMonthValue = Number(getValues().startMonth?.value) + 1;
    const getDaysInMonthStart = startMonthValue && getDaysInMonth(Number(startYearValue), startMonthValue);
    const options = getDaysInMonthStart
      ? Array.from({ length: getDaysInMonthStart }, (_, index) => ({
          label: `${index + 1}`,
          value: `${index + 1}`,
        }))
      : [];
    setStartDays(options);
  };

  const getEndDayOptions = () => {
    const endYearValue = getValues().endYear?.value;
    const endMonthValue = Number(getValues().endMonth?.value) + 1;
    const getDaysInMonthEnd = endMonthValue && getDaysInMonth(Number(endYearValue), endMonthValue);
    const options = getDaysInMonthEnd
      ? Array.from({ length: getDaysInMonthEnd }, (_, index) => ({
          label: `${index + 1}`,
          value: `${index + 1}`,
        }))
      : [];
    setEndDays(options);
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
  const startDateErrors =
    errors['startMonth']?.label?.message || errors['startDay']?.label?.message || errors['startYear']?.label?.message;
  const endDateErrors =
    errors['endMonth']?.label?.message ||
    errors['endDay']?.label?.message ||
    errors['endYear']?.label?.message ||
    dateError;

  const initializeValues = () => {
    //FIXME: start_at and end_at from BE, not in UTC version
    const getUTCDate = (date: string) => (date.endsWith('Z') ? date : `${date}Z`);
    const startDate = experience?.start_at ? new Date(getUTCDate(experience.start_at)) : undefined;
    const endDate = experience?.end_at ? new Date(getUTCDate(experience.end_at)) : undefined;
    const currentDate = new Date();

    const empTypeLabel = experience ? PROJECT_TYPE.find(t => t.value === experience.employment_type)?.title : undefined;

    const initialVal = {
      title: experience?.title || '',
      jobCategory: {
        label: jobCategories?.find(category => category.value === experience?.job_category_id)?.label || '',
        value: experience?.job_category_id || '',
      },
      orgName: experience?.org.name || '',
      orgId: experience?.org.id || '',
      city: { value: '', label: experience?.city || experience?.org.city || '' },
      country: experience?.country || '',
      startMonth: {
        label: startDate ? monthNames[startDate.getMonth()] : '',
        value: startDate ? startDate.getMonth() : '',
      },
      startDay: {
        label: startDate?.getDate() || '',
        value: startDate?.getDate() || '',
      },
      startYear: { label: startDate?.getFullYear() || '', value: startDate?.getFullYear() || '' },
      endMonth: {
        label: endDate ? monthNames[endDate.getMonth()] : monthNames[currentDate.getUTCMonth()],
        value: endDate ? endDate.getMonth() : currentDate.getUTCMonth(),
      },
      endDay: {
        label: endDate?.getDate() || currentDate.getUTCDate(),
        value: endDate?.getDate() || currentDate.getUTCDate(),
      },
      endYear: {
        label: endDate?.getFullYear() || currentDate.getUTCFullYear(),
        value: endDate?.getFullYear() || currentDate.getUTCFullYear(),
      },
      description: experience?.description || '',
      org: {
        value: experience?.org_id || '',
        label: experience?.org.name || '',
      },
      employmentType: { value: experience?.employment_type || '', label: empTypeLabel },
      weeklyHours: experience?.weekly_hours?.toString() || '',
    };
    reset(initialVal);
  };

  const startMonth = watch('startMonth');
  const endMonth = watch('endMonth');
  const startDay = watch('startDay');
  const endDay = watch('endDay');
  const startYear = watch('startYear');
  const endYear = watch('endYear');

  const validateDates = () => {
    if (!startYear?.label || !endYear?.label) return;
    const start = new Date(Number(startYear?.label), Number(startMonth?.value || 0), Number(startDay?.value || 1));
    const end = new Date(Number(endYear?.label), Number(endMonth?.value || 0), Number(endDay?.value || 1));
    if (end < start) return 'Start date cannot be later than end date';
    return;
  };

  useEffect(() => {
    const msg = validateDates();
    if (msg) {
      setDateError(msg);
    } else setDateError('');
  }, [startMonth, startDay, startYear, endMonth, endDay, endYear]);

  useEffect(() => {
    getStartDayOptions();
  }, [startMonth, startYear]);

  useEffect(() => {
    getEndDayOptions();
  }, [endMonth, endYear]);

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

  const onSelectEmplymentType = (newType: OptionType) => {
    setValue('employmentType', newType, { shouldValidate: true });
  };

  const onSelectStartMonth = (month: OptionType) => {
    setValue('startMonth', month, { shouldValidate: true });
  };

  const onSelectStartDay = (day: OptionType) => {
    setValue('startDay', day, { shouldValidate: true });
  };
  const onSelectEndMonth = (month: OptionType) => {
    setValue('endMonth', month, { shouldValidate: true });
  };
  const onSelectEndDay = (day: OptionType) => {
    setValue('endDay', day, { shouldValidate: true });
  };
  const onSelectStartYear = (year: OptionType) => {
    setValue('startYear', year, { shouldValidate: true });
  };
  const onSelectEndYear = (year: OptionType) => {
    setValue('endYear', year, { shouldValidate: true });
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
      startDay,
      jobCategory,
      endYear,
      endMonth,
      endDay,
      country,
      city,
      employmentType,
      weeklyHours,
    } = getValues();

    let organizationId = org.value;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: org.label, email: 'org@socious.io' }, false)).id;
    }

    const startDate = new Date(
      Number(startYear.value),
      Number(startMonth.value || 0),
      Number(startDay.value || 1),
    ).toISOString();

    let payload: ExperienceReq = {
      org_id: organizationId,
      title,
      description,
      start_at: startDate,
      job_category_id: jobCategory.value,
      country,
      city: city.label,
      weekly_hours: weeklyHours ? parseFloat(weeklyHours) : null,
    };
    if (employmentType.value) payload.employment_type = employmentType.value;
    if (endYear.value) {
      const endDate = new Date(
        Number(endYear.value),
        Number(endMonth.value || 0),
        Number(endDay.value || 1),
      ).toISOString();
      payload.end_at = endDate;
    }

    payload = removedEmptyProps(payload);
    const updatedExperience = await updateExperiences(experience.id, payload);
    onUpdateExperience?.(updatedExperience);
    handleClose();
  };

  return {
    jobCategories,
    register,
    handleSubmit,
    errors,
    category: getValues().jobCategory,
    onChangeCategory,
    employmentTypeVal: getValues().employmentType,
    employmentTypes,
    onSelectEmplymentType,
    years,
    months,
    startDays,
    endDays,
    startMonth: getValues().startMonth,
    startDay: getValues().startDay,
    startYear: getValues().startYear,
    endMonth: getValues().endMonth,
    endDay: getValues().endDay,
    endYear: getValues().endYear,
    onSelectStartMonth,
    onSelectStartDay,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndDay,
    onSelectEndYear,
    volunteer: getValues().volunteer,
    handleCheckVolunteer,
    onSave,
    startDateErrors,
    endDateErrors,
  };
};
