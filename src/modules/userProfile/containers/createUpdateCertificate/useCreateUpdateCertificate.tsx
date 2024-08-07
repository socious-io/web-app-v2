import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization, Organization, otherProfileByUsername, search, User } from 'src/core/api';
import { createAdditional, removeAdditional, updateAdditional } from 'src/core/api/additionals/additionals.api';
import { AdditionalReq, AdditionalRes, CertificateMeta } from 'src/core/api/additionals/additionals.types';
import { monthNames } from 'src/core/time';
import { removedEmptyProps } from 'src/core/utils';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { RootState } from 'src/store';
import { setIdentity, setIdentityType } from 'src/store/reducers/profile.reducer';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Required'),
    orgName: yup.string().required('Required'),
    orgId: yup.string(),
    orgImageId: yup.string(),
    orgImageUrl: yup.string(),
    orgCity: yup.string(),
    issueMonth: yup.string(),
    issueYear: yup.string(),
    expireMonth: yup.string(),
    expireYear: yup.string(),
    credentialId: yup.string(),
    credentialUrl: yup
      .string()
      .matches(
        /^$|((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!',
      ),
    description: yup.string(),
  })
  .required();

interface OptionType {
  value: string;
  label: string;
}

export const useCreateUpdateCertificate = (
  handleClose: () => void,
  certificate: AdditionalRes | undefined,
  setCertificate: (val: AdditionalRes) => void,
) => {
  const user = useSelector<RootState, User | Organization | undefined>(state => {
    return state.profile.identity;
  }) as User;
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const [orgVal, setOrgVal] = useState<OptionType | null>();
  const [months, setMonths] = useState<OptionType[]>([]);
  const [years, setYears] = useState<OptionType[]>([]);
  const [issueMonth, setIssueMonth] = useState<OptionType | null>();
  const [issueYear, setIssueYear] = useState<OptionType | null>();
  const [expMonth, setExpMonth] = useState<OptionType | null>();
  const [expYear, setExpYear] = useState<OptionType | null>();
  const [dateError, setDateError] = useState('');
  const issueDateErrors = errors['issueMonth']?.message || errors['issueYear']?.message;
  const expireDateErrors = errors['expireMonth']?.message || errors['expireYear']?.message || dateError;

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
    const meta = certificate ? (certificate.meta as CertificateMeta) : null;

    const intialValue = {
      name: certificate?.title || '',
      orgId: meta?.organization_id || '',
      orgName: meta?.organization_name || '',
      issueMonth: meta?.issue_month || '',
      issueYear: meta?.issue_year || '',
      expireMonth: meta?.expire_month || '',
      expireYear: meta?.expire_year || '',
      description: certificate?.description || '',
      credentialId: meta?.credential_id || '',
      credentialUrl: meta?.credential_url || '',
    };

    reset(intialValue);

    setOrgVal(
      meta?.organization_name
        ? {
            value: meta?.organization_id || '',
            label: meta?.organization_name,
          }
        : null,
    );

    setIssueMonth(
      meta?.issue_month
        ? {
            value: meta.issue_month,
            label: monthNames[Number(meta.issue_month)],
          }
        : null,
    );
    setIssueYear(meta?.issue_year ? { value: meta.issue_year, label: meta.issue_year } : null);
    setExpMonth(
      meta?.expire_month
        ? {
            value: meta.expire_month,
            label: monthNames[Number(meta.expire_month)],
          }
        : null,
    );
    setExpYear(meta?.expire_year ? { value: meta?.expire_year, label: meta?.expire_year } : null);
  };

  useEffect(() => {
    mapMonthNames();
    getYearOptions();
    initializeValues();
  }, [certificate]);

  const issueMonthVal = watch('issueMonth');
  const expireMonthVal = watch('expireMonth');
  const issueYearVal = watch('issueYear');
  const expireYearVal = watch('expireYear');

  const validateDates = () => {
    if (!issueYearVal || !expireYearVal) return;
    const start = new Date(Number(issueYearVal), Number(issueMonthVal || 0), 2);
    const end = expireYearVal ? new Date(Number(expireYearVal), Number(expireMonthVal || 0), 2) : undefined;
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
  }, [issueMonthVal, issueYearVal, expireMonthVal, expireYearVal]);

  const orgToOption = (orgList: Organization[], searchText: string) => {
    let options = [];
    options = orgList.map(s => ({
      value: s.id,
      label: s.name,
      icon: s.image ? (
        <img src={s.image.url} width={24} height={24} alt="" />
      ) : (
        <Avatar type="organizations" size="24px" />
      ),
      city: s.city,
      imageId: s.image?.id,
      imageUrl: s.image?.url,
    }));
    return options;
  };
  const searchOrgs = async (searchText: string, cb) => {
    try {
      if (searchText) {
        const response = await search({ type: 'organizations', q: searchText, filter: {} }, { page: 1, limit: 10 });
        cb(orgToOption(response.items, searchText));
      }
    } catch (error) {
      console.error('Error fetching city data:', error);
    }
  };

  const onSelectOrg = newCompanyVal => {
    const value = newCompanyVal.value === newCompanyVal.label ? '' : newCompanyVal.value;
    setValue('orgId', value, { shouldValidate: true });
    setValue('orgName', newCompanyVal.label, { shouldValidate: true });
    newCompanyVal?.city && setValue('orgCity', newCompanyVal.city, { shouldValidate: true });
    newCompanyVal?.imageId && setValue('orgImageId', newCompanyVal.imageId, { shouldValidate: true });
    newCompanyVal?.imageUrl && setValue('orgImageUrl', newCompanyVal.imageUrl, { shouldValidate: true });
    setOrgVal({ value: newCompanyVal.value, label: newCompanyVal.label });
  };

  const onSelectIssueMonth = (month: OptionType) => {
    setValue('issueMonth', month.value, { shouldValidate: true });
    setIssueMonth(month);
  };
  const onSelectExpMonth = (month: OptionType) => {
    setValue('expireMonth', month.value, { shouldValidate: true });
    setExpMonth(month);
  };
  const onSelectIssueYear = (year: OptionType) => {
    setValue('issueYear', year.value, { shouldValidate: true });
    setIssueYear(year);
  };
  const onSelectExpYear = (year: OptionType) => {
    setValue('expireYear', year.value, { shouldValidate: true });
    setExpYear(year);
  };

  const onSave = async () => {
    const {
      name,
      orgName,
      orgId,
      issueMonth,
      issueYear,
      expireMonth,
      expireYear,
      credentialId,
      credentialUrl,
      description,
      orgImageId,
      orgImageUrl,
      orgCity,
    } = getValues();

    let oId = orgId;
    if (!oId) {
      oId = (await createOrganization({ name: orgName, email: 'org@socious.io' }, false)).id;
    }
    const payloadMeta: CertificateMeta = {
      organization_id: oId,
      organization_name: orgName,
      credential_id: credentialId,
      credential_url: credentialUrl,
      issue_month: issueMonth,
      issue_year: issueYear,
      expire_month: expireMonth,
      expire_year: expireYear,
      organization_city: orgCity,
      organization_image: orgImageUrl,
    };
    const payload: AdditionalReq = {
      type: 'CERTIFICATE',
      title: name,
      enabled: true,
      image: orgImageId,
    };

    if (description) payload.description = description;
    removedEmptyProps(payloadMeta);
    removedEmptyProps(payload);
    payload.meta = payloadMeta;

    if (certificate) {
      const res = await updateAdditional(certificate.id, payload);
      setCertificate(res);
    } else {
      const res = await createAdditional(payload);
      setCertificate(res);
    }
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    handleClose();
  };

  const onDelete = async () => {
    if (certificate) await removeAdditional(certificate.id);
    const updated = await otherProfileByUsername(user?.username || '');
    dispatch(setIdentity(updated));
    dispatch(setIdentityType('users'));
    handleClose();
  };

  return {
    register,
    user,
    errors,
    orgVal,
    searchOrgs,
    onSelectOrg,
    issueYear,
    issueMonth,
    expMonth,
    expYear,
    months,
    years,
    onSelectIssueMonth,
    onSelectIssueYear,
    onSelectExpMonth,
    onSelectExpYear,
    handleSubmit,
    onSave,
    onDelete,
    issueDateErrors,
    expireDateErrors,
  };
};
