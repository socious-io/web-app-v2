import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addEducations,
  createOrganization,
  Education,
  EducationsReq,
  Organization,
  otherProfileByUsername,
  search,
  updateEducations,
  User,
} from 'src/core/api';
import { removeAdditional } from 'src/core/api/additionals/additionals.api';
import { getUTCDate, monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import { v4 as uuidv4 } from 'uuid';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    school: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    degree: yup.string(),
    field: yup.string().required('Required'),
    startMonth: yup.object().shape({
      label: yup.string().required('Required'),
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
    grade: yup.string(),
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}

export const useCreateUpdateEducation = (
  handleClose: () => void,
  education?: Education,
  onAddEducation?: (education: Education, isEdit: boolean) => void,
) => {
  const dispatch = useDispatch();
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [dateError, setDateError] = useState('');
  const schoolsRef = useRef<Organization[]>([]);
  const schools = schoolsRef.current;

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

  const initializeValues = () => {
    const startDate = education?.start_at ? new Date(getUTCDate(education.start_at)) : undefined;
    const endDate = education?.end_at ? new Date(getUTCDate(education.end_at)) : undefined;

    const initialVal = {
      school: { label: education?.org.name || '', value: education?.org.id || '' },
      degree: education?.degree || '',
      field: education?.title || '',
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

      grade: education?.grade || '',
      description: education?.description || '',
    };
    reset(initialVal);
  };

  useEffect(() => {
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [education]);

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

  const startMonth = watch('startMonth');
  const endMonth = watch('endMonth');
  const startYear = watch('startYear');
  const endYear = watch('endYear');

  const validateDates = () => {
    if (!startYear?.label) return;
    const start = new Date(Number(startYear?.label), Number(startMonth?.value || 0), 2);
    const end = endYear?.label ? new Date(Number(endYear?.label), Number(endMonth?.value || 0), 2) : undefined;
    const current = new Date();
    if (end && end < start) return 'Start date cannot be later than end date';
    if ((end && end > current) || start > current) return 'Selected date cannot be later than current date';
    return;
  };

  useEffect(() => {
    const msg = validateDates();
    if (msg) {
      setDateError(msg);
    } else setDateError('');
  }, [startMonth, startYear, endMonth, endYear]);

  const schoolToOption = (schoolList: Organization[]) => {
    const options = schoolList.map(list => ({
      value: list.id,
      label: list.name,
      icon: list.image ? (
        <img src={list.image.url} width={24} height={24} alt="" />
      ) : (
        <Avatar type="organizations" size="24px" />
      ),
      image: list.image?.url,
      imageId: list.image?.id,
      city: list.city,
    }));
    return options;
  };

  const searchSchools = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await search({ type: 'organizations', q: searchText, filter: {} }, { page: 1, limit: 10 });
        schoolsRef.current = response.items;
        cb(schoolToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectSchool = newCompanyVal => {
    const newValue = newCompanyVal.value === newCompanyVal.label ? '' : newCompanyVal.value;
    setValue('school', { ...newCompanyVal, value: newValue }, { shouldValidate: true });
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

  const onDelete = async () => {
    if (education) await removeAdditional(education.id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    handleClose();
  };

  const onSave = async () => {
    if (dateError) return;
    const { school, degree, field, startMonth, startYear, endMonth, endYear, grade, description } = getValues();

    let organizationId = school.value;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: school.label, email: 'org@socious.io' }, false)).id;
    }

    const currentDate = new Date();
    const startDate = new Date(Number(startYear?.value), Number(startMonth.value || 0), 1).toISOString();
    const endDate = new Date(
      Number(endYear?.value) || currentDate.getUTCFullYear(),
      Number(endMonth.value || 0),
      1,
    ).toISOString();

    let payload: EducationsReq = {
      org_id: organizationId,
      title: field,
      degree,
      grade,
      description,
      start_at: startDate,
      end_at: !endYear?.value && !endMonth?.value ? '' : endDate,
    };

    if (onAddEducation) {
      onAddEducation(
        {
          ...payload,
          org: (schools?.find(school => school.id === organizationId) as Organization) || education?.org,
          id: education ? education.id : uuidv4(),
        },
        !!education,
      );
    } else {
      payload = removedEmptyProps(payload) as EducationsReq;
      if (education) await updateEducations(education.id, payload);
      else await addEducations(payload);
      const updated = await otherProfileByUsername(user?.username || '');
      dispatch(setIdentity(updated));
      dispatch(setIdentityType('users'));
    }
    handleClose();
  };

  return {
    schoolVal: getValues().school,
    searchSchools,
    onSelectSchool,
    errors,
    register,
    months,
    years,
    startMonth: getValues().startMonth,
    startYear: getValues().startYear,
    endMonth: getValues().endMonth,
    endYear: getValues().endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    handleSubmit,
    onSave,
    onDelete,
    startDateErrors,
    endDateErrors,
  };
};
