import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization, Organization, otherProfileByUsername, search, User } from 'src/core/api';
import { createAdditional, removeAdditional, updateAdditional } from 'src/core/api/additionals/additionals.api';
import { AdditionalReq, AdditionalRes, EducationMeta } from 'src/core/api/additionals/additionals.types';
import { monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { Avatar } from 'src/Nowruz/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    school: yup.object().shape({
      label: yup.string().required('Required'),
      value: yup.string(),
    }),
    degree: yup.string(),
    field: yup.string(),
    startMonth: yup.object().shape({
      label: yup.string(),
      value: yup.string(),
    }),
    startYear: yup.object().shape({
      label: yup.string(),
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
  setEducation: (val: AdditionalRes) => void,
  education?: AdditionalRes,
) => {
  const user = useSelector<RootState, User | Organization | undefined>((state) => {
    return state.profile.identity;
  }) as User;

  const [schools, setSchools] = useState<Organization[]>([]);
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [dateError, setDateError] = useState('');
  const dispatch = useDispatch();

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

  const initializeValues = () => {
    const meta = education ? (education.meta as EducationMeta) : null;

    const initialVal = {
      school: { label: meta?.school_name || '', value: meta?.school_id || '' },
      degree: meta?.degree || '',
      field: meta?.field || '',
      startMonth: {
        label: meta?.start_month ? monthNames[Number(meta.start_month)] : '',
        value: meta?.start_month || '',
      },
      startYear: { label: meta?.start_year || '', value: meta?.start_year || '' },
      endMonth: { label: meta?.end_month ? monthNames[Number(meta.end_month)] : '', value: meta?.end_month || '' },
      endYear: { label: meta?.end_year || '', value: meta?.end_year || '' },
      grade: meta?.grade || '',
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

  const startMonth = watch('startMonth');
  const endMonth = watch('endMonth');
  const startYear = watch('startYear');
  const endYear = watch('endYear');

  const validateDates = () => {
    if (!startYear?.label) return;
    const start = new Date(Number(startYear?.label), Number(startMonth?.value || 0), 2);
    const end = endYear?.label ? new Date(Number(endYear?.label), Number(endMonth?.value || 0), 2) : undefined;
    if (end && end < start) return 'Start date cannot be later than end date';
    return;
  };

  useEffect(() => {
    const msg = validateDates();
    if (msg) {
      setDateError(msg);
    } else setDateError('');
  }, [startMonth, startYear, endMonth, endYear]);

  const schoolToOption = (schoolList: Organization[], searchText: string) => {
    let options: OptionType[] = [];
    if (!schoolList.length) options = options.concat({ value: '', label: searchText });
    options = options.concat(
      schoolList.map((s) => ({
        value: s.id,
        label: s.name,
        icon: s.image ? (
          <img src={s.image.url} width={24} height={24} alt="" />
        ) : (
          <Avatar type="organizations" size="24px" />
        ),
      })),
    );
    return options;
  };
  const searchSchools = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await search({ type: 'organizations', q: searchText, filter: {} }, { page: 1, limit: 10 });
        setSchools(response.items);
        cb(schoolToOption(response.items, searchText));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectSchool = (newCompanyVal: OptionType) => {
    setValue('school', newCompanyVal, { shouldValidate: true });
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

    let schId = school.value;
    if (!schId) {
      schId = (await createOrganization({ name: school.label, email: 'org@socious.io' }, false)).id;
    }
    const payloadMeta: EducationMeta = {
      field: field,
      grade: grade,
      degree: degree,
      end_month: endMonth.value,
      end_year: endYear.value,
      start_month: startMonth.value,
      start_year: startYear.value,
      school_id: schId,
      school_name: school.label,
    };
    const payload: AdditionalReq = {
      type: 'EDUCATION',
      title: school.label,
      enabled: true,
    };

    if (school.value) {
      const sch = schools.find((i) => i.id === school.value);
      payload.image = sch?.image?.id;
      payloadMeta.school_city = sch?.city;
      payloadMeta.school_image = sch?.image?.url;
    }

    if (description) payload.description = description;
    removedEmptyProps(payloadMeta);
    removedEmptyProps(payload);
    payload.meta = payloadMeta;

    if (education) {
      const res = await updateAdditional(education.id, payload);
      setEducation(res);
    } else {
      const res = await createAdditional(payload);
      setEducation(res);
    }
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
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
    dateError,
  };
};
