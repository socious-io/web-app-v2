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
import { setUser } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    schoolName: yup.string().required('School is required'),
    schoolId: yup.string(),
    degree: yup.string(),
    field: yup.string(),
    startMonth: yup.string(),
    startYear: yup.string(),
    endMonth: yup.string(),
    endYear: yup.string(),
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
  education: AdditionalRes,
  setEducation: (val: AdditionalRes) => void,
) => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });

  const [schoolVal, setSchoolVal] = useState<OptionType | null>();
  const [schools, setSchools] = useState<Organization[]>([]);
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [startMonth, setStartMonth] = useState<OptionType | null>();
  const [startYear, setStartYear] = useState<OptionType | null>();
  const [endMonth, setEndMonth] = useState<OptionType | null>();
  const [endYear, setEndYear] = useState<OptionType | null>();

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
      schoolName: meta?.school_name || '',
      schoolId: meta?.school_id || '',
      degree: meta?.degree || '',
      field: meta?.field || '',
      startMonth: meta?.start_month || '',
      startYear: meta?.start_year || '',
      endMonth: meta?.end_month || '',
      endYear: meta?.end_year || '',
      grade: meta?.grade || '',
      description: education?.description || '',
    };
    reset(initialVal);

    setSchoolVal(
      meta?.school_name
        ? {
            value: meta?.school_id || '',
            label: meta?.school_name,
          }
        : null,
    );

    setStartMonth(
      meta?.start_month
        ? {
            value: meta?.start_month,
            label: monthNames[Number(meta.start_month)],
          }
        : null,
    );
    setStartYear(meta?.start_year ? { value: meta?.start_year, label: meta?.start_year } : null);
    setEndMonth(
      meta?.end_month
        ? {
            value: meta?.end_month,
            label: monthNames[Number(meta.end_month)],
          }
        : null,
    );
    setEndYear(meta?.end_year ? { value: meta?.end_year, label: meta?.end_year } : null);
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
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

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
    setValue('schoolId', newCompanyVal.value, { shouldValidate: true });
    setValue('schoolName', newCompanyVal.label, { shouldValidate: true });
    setSchoolVal({ value: newCompanyVal.value, label: newCompanyVal.label });
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

  const onDelete = async () => {
    if (education) await removeAdditional(education.id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setUser(updated));
    handleClose();
  };

  const onSave = async () => {
    const { schoolName, schoolId, degree, field, startMonth, startYear, endMonth, endYear, grade, description } =
      getValues();

    let schId = schoolId;
    if (!schId) {
      schId = (await createOrganization({ name: schoolName, email: 'org@socious.io' }, false)).id;
    }
    const payloadMeta: EducationMeta = {
      field: field,
      grade: grade,
      degree: degree,
      end_month: endMonth,
      end_year: endYear,
      start_month: startMonth,
      start_year: startYear,
      school_id: schId,
      school_name: schoolName,
    };
    const payload: AdditionalReq = {
      type: 'EDUCATION',
      title: schoolName,
      enabled: true,
    };

    if (schoolId) {
      const sch = schools.find((i) => i.id === schoolId);
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
    dispatch(setUser(updated));
    handleClose();
  };

  return {
    schoolVal,
    searchSchools,
    onSelectSchool,
    errors,
    register,
    months,
    years,
    startMonth,
    startYear,
    endMonth,
    endYear,
    onSelectStartMonth,
    onSelectStartYear,
    onSelectEndMonth,
    onSelectEndYear,
    handleSubmit,
    onSave,
    onDelete,
  };
};
