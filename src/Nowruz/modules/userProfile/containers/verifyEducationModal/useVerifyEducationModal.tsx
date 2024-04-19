import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  createOrganization,
  Education,
  EducationsReq,
  Organization,
  OrganizationReq,
  updateEducations,
  updateOrganization,
} from 'src/core/api';
import { getDaysInMonth, getUTCDate, monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { AccountItem } from 'src/Nowruz/modules/general/components/avatarDropDown/avatarDropDown.types';
import * as yup from 'yup';

import { OptionType } from './verifyEducationModal.types';

const schema = yup.object().shape({
  credentialName: yup
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

export const useVerifyEducationModal = (
  handleClose: () => void,
  onVerifyEducation: (id: string, message?: string, exact_info?: boolean) => void,
  organization: Organization,
  education: Education,
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
    const awardedDate = education.end_at ? new Date(getUTCDate(education.end_at)) : undefined;

    const initialVal = {
      credentialName: education.degree || '',
      email: organization.email || '',
      message: '',
      forgotInfo: false,
      month: {
        label: awardedDate ? monthNames[awardedDate.getMonth()] : '',
        value: awardedDate ? awardedDate.getMonth() : '',
      },
      day: {
        label: awardedDate?.getDate() || '',
        value: awardedDate?.getDate() || '',
      },
      year: {
        label: awardedDate?.getFullYear() || '',
        value: awardedDate?.getFullYear() || '',
      },
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
    const { month, year, day, email, credentialName, message, forgotInfo } = getValues();
    const startedDate = education.start_at ? new Date(getUTCDate(education.start_at)) : undefined;
    const title = education?.title || '';
    const grade = education?.grade || '';
    const description = education?.description || '';

    let organizationId = organization.id;
    if (!organizationId) {
      organizationId = (await createOrganization({ name: organization.name, email: 'org@socious.io' }, false)).id;
    }

    const startDate = new Date(
      Number(startedDate?.getFullYear()),
      Number(startedDate?.getMonth() || 0),
      Number(startedDate?.getDate() || 1),
    ).toISOString();

    let payload: EducationsReq = {
      org_id: organizationId,
      title,
      degree: credentialName,
      grade,
      description,
      start_at: startDate,
    };
    if (year.value) {
      const endDate = new Date(Number(year.value), Number(month.value || 0), Number(day.value || 1)).toISOString();
      payload.end_at = endDate;
    }

    payload = removedEmptyProps(payload) as EducationsReq;
    await updateEducations(education.id, payload);
    if (!organization.verified) {
      const org = { name: organization.name, email } as OrganizationReq;
      updateOrganization(organization.id, org);
    }
    onVerifyEducation(education.id, message, !forgotInfo);
    handleClose();
    return;
  };

  const subtitle = organization.verified
    ? `Confirm the below information to send your request to ${organization?.name}`
    : `${organization?.name} is not registered organization. Confirm your information and send your request.`;

  const accountItem = {
    id: organization.id,
    name: organization.name,
    type: 'organizations',
    username: organization.shortname,
    img: organization.image?.url || '',
  } as AccountItem;

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
    subtitle,
    accountItem,
  };
};
