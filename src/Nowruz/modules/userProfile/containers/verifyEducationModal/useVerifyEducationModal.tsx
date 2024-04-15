import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Organization, OrganizationReq, updateOrganization } from 'src/core/api';
import { updateAdditional } from 'src/core/api/additionals/additionals.api';
import { AdditionalReq, AdditionalRes, EducationMeta } from 'src/core/api/additionals/additionals.types';
import { getDaysInMonth, monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import * as yup from 'yup';

import { OptionType } from './verifyEducationModal.types';

const schema = yup.object().shape({
  creadentialName: yup
    .string()
    .trim()
    .required('Required')
    .min(2, 'Must be 2-50 characters')
    .max(50, 'Must be 2-50 characters'),
  email: yup.string().email().required('Required'),
  forgotInfo: yup.boolean(),
  month: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .when('forgotInfo', {
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
  day: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .when('forgotInfo', {
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
  year: yup
    .object()
    .shape({ label: yup.string(), value: yup.string() })
    .when('forgotInfo', {
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
  message: yup.string().required('Required'),
});

export const useVerifyExperienceModal = (
  education: AdditionalRes,
  organization: Organization,
  handleClose: () => void,
  onSendRequest: (id: string, message?: string, exact_info?: boolean) => void,
) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    trigger,
    watch,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const meta = education.meta as EducationMeta;

  const [months, setMonths] = useState<OptionType[]>([]);
  const [days, setDays] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);

  const mapMonthNames = () => {
    const options = monthNames.map((m, index) => {
      return { value: index.toString(), label: m };
    });
    setMonths(options);
  };

  const getDayOptions = () => {
    const yearValue = getValues().year?.value || new Date().getFullYear();
    const monthValue = Number(getValues().month?.value) + 1;
    const getAllDaysInMonth = monthValue && getDaysInMonth(Number(yearValue), monthValue);
    const options = getAllDaysInMonth
      ? Array.from({ length: getAllDaysInMonth }, (_, index) => ({
          label: `${index + 1}`,
          value: `${index + 1}`,
        }))
      : [];
    setDays(options);
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

  const initializeValues = () => {
    const awardedDate = meta.awarded_date ? new Date(meta.awarded_date) : undefined;
    const strYear = awardedDate?.getFullYear().toString() || '';
    const strDay = awardedDate?.getDate().toString() || '';

    const initialVal = {
      creadentialName: meta.credential_name || `${meta.degree}${meta.field ? ` in ${meta.field}` : ''}`,
      email: organization.email || '',
      message: '',
      forgotInfo: false,
      month: {
        label: awardedDate ? monthNames[awardedDate.getMonth()] : '',
        value: awardedDate ? awardedDate.getMonth().toString() : '',
      },
      day: {
        label: strDay,
        value: strDay,
      },
      year: { label: strYear, value: strYear },
    };
    reset(initialVal);
  };

  useEffect(() => {
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [education]);

  const monthVal = watch('month');
  const yearVal = watch('year');
  useEffect(() => {
    getDayOptions();
  }, [monthVal, yearVal]);

  const onSelectMonth = (month: OptionType) => {
    setValue('month', month, { shouldValidate: true });
  };
  const onSelectDay = (day: OptionType) => {
    setValue('day', day, { shouldValidate: true });
  };

  const onSelectYear = (year: OptionType) => {
    setValue('year', year, { shouldValidate: true });
  };

  const handleForgotInfo = (value: boolean) => {
    setValue('forgotInfo', value, { shouldValidate: true });
    trigger(['day', 'month', 'year']);
  };

  // apply backend API
  const onSend = async () => {
    const { month, year, day, email, creadentialName, message, forgotInfo } = getValues();

    //update education
    const meta: EducationMeta = { ...education.meta };
    if (year.value && month.value && day.value)
      meta.awarded_date = new Date(Number(year.value), Number(month.value), Number(day.value)).toISOString();
    meta.credential_name = creadentialName;
    const additional = removedEmptyProps({ type: education.type, title: creadentialName, meta }) as AdditionalReq;
    updateAdditional(education.id, additional);

    // update org email
    if (!organization.verified) {
      const org = { name: organization.name, email } as OrganizationReq;
      updateOrganization(organization.id, org);
    }
    await onSendRequest(education.id, message, !forgotInfo);
    handleClose();
    return;
  };

  return {
    register,
    errors,
    months,
    days,
    years,
    month: getValues().month,
    day: getValues().day,
    year: getValues().year,
    forgotInfo: getValues().forgotInfo,
    handleSubmit,
    onSend,
    onSelectDay,
    onSelectMonth,
    onSelectYear,
    handleForgotInfo,
  };
};
