import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization, Organization, otherProfileByUsername, search, User } from 'src/core/api';
import { createAdditional, updateAdditional } from 'src/core/api/additionals/additionals.api';
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
    schoolName: yup.string().required('Required'),
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

export const useCreateUpdateEducation = (handleClose: () => void, education?: AdditionalRes) => {
  const user = useSelector<RootState, User | undefined>((state) => {
    return state.profile.user;
  });
  const [schoolVal, setSchoolVal] = useState<OptionType>();
  const [schools, setSchools] = useState<Organization[]>([]);
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [startMonth, setStartMonth] = useState<OptionType>();
  const [startYear, setStartYear] = useState<OptionType>();
  const [endMonth, setEndMonth] = useState<OptionType>();
  const [endYear, setEndYear] = useState<OptionType>();
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
    setValue('schoolName', education?.title || '');
    setValue('schoolId', education?.meta.school_id || '');
    setValue('degree', education?.meta.degree || '');
    setValue('field', education?.meta.field || '');
    setValue('startMonth', education?.meta.start_date ? new Date(education.meta.start_date).getMonth().toString() : '');
    setValue(
      'startYear',
      education?.meta.start_date ? new Date(education.meta.start_date).getFullYear().toString() : '',
    );
    setValue('endMonth', education?.meta.end_date ? new Date(education.meta.end_date).getMonth().toString() : '');
    setValue('endYear', education?.meta.end_date ? new Date(education.meta.end_date).getFullYear().toString() : '');
    setValue('grade', education?.meta.grade || '');
    setValue('description', education?.description || '');

    //   setSchoolVal()
    // const [months, setMonths] = useState<OptionType[]>([]);
    // const [years, setYears] = useState<OptionType[]>([]);
    // const [startMonth, setStartMonth] = useState<OptionType>();
    // const [startYear, setStartYear] = useState<OptionType>();
    // const [endMonth, setEndMonth] = useState<OptionType>();
    // const [endYear, setEndYear] = useState<OptionType>();

    //   setStartMonth({ value: (startMonthValue || '').toString(), label: startMonthLabel });
    //   setStartYear({ value: startYear, label: startYear });
    //   setEndMonth({ value: (endMonthValue || '').toString(), label: endMonthLabel });
    //   setEndYear({ value: endYear, label: endYear });
    //   setCurrentlyWorking(experience ? !experience?.end_at : false);

    //   setCompanyVal({
    //     value: experience?.org_id || '',
    //     label: experience?.org.name || '',
    //   });
    //   setCityVal({ value: '', label: experience?.city || experience?.org.city || '' });
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

  const onSave = async () => {
    const { schoolName, schoolId, degree, field, startMonth, startYear, endMonth, endYear, grade, description } =
      getValues();

    let schId = schoolId;
    if (!schId) {
      schId = (await createOrganization({ name: schoolName, email: 'org@socious.io' }, false)).id;
    }

    let payloadMeta: EducationMeta = {
      field: field,
      grade: grade,
      degree: degree,
      end_month: endMonth,
      end_year: endYear,
      start_month: startMonth,
      start_year: startYear,
      school_id: schoolId,
      school_name: schoolName,
    };

    payloadMeta = removedEmptyProps(payloadMeta);
    const payload: AdditionalReq = {
      type: 'EDUCATION',
      title: schoolName,
      enabled: true,
      meta: payloadMeta,
    };

    if (schoolId) {
      const sch = schools.find((i) => i.id === schoolId);
      payload.image = sch?.image?.url;
    }
    if (description) payload.description = description;
    if (education) await updateAdditional(education.identity_id, payload);
    else await createAdditional(payload);
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
  };
};
