import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Navigate, useLoaderData, useNavigate } from 'react-router-dom';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { CurrentIdentity, OrgMeta } from 'src/core/api';
import {
  ProjectLengthType,
  ProjectPaymentSchemeType,
  ProjectPaymentType,
  ProjectRemotePreferenceType,
  ProjectType,
  SocialCauses,
  createJob,
  searchLocation,
  skills,
} from 'src/core/api';
import { removedEmptyProps } from 'src/core/utils';
import { RootState } from 'src/store';
import * as yup from 'yup';

type Location =
  | {
      city: string;
      country: string;
    }
  | undefined;
type Inputs = {
  title: string;
  cause: SocialCauses;
  description: string;
  category: string;
  paymentMin: number;
  paymentMax: number;
  commitmentHoursLower: number;
  commitmentHoursHigher: number;
  skills: Array<{ label: string; value: string }>;
  preference: ProjectRemotePreferenceType;
  type: ProjectType;
  length: ProjectLengthType;
  location?: Location;
  paymentType: ProjectPaymentType;
  paymentScheme: ProjectPaymentSchemeType;
  experienceLevel: number;
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters').required(),
  cause: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  experienceLevel: yup.number().required('experience level is a required field'),
  length: yup.string().required('job length is a required field'),
  paymentMin: yup.number().lessThan(yup.ref('paymentMax'), 'Max price must be higher than min price'),
  paymentMax: yup.number().moreThan(yup.ref('paymentMin'), 'Max price must be higher than min price'),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    )
    .required('Skills are required'),
  preference: yup.string().required(),
  paymentType: yup.string().required('payment type is a required field'),
  type: yup.string().required(),
  paymentScheme: yup.string().required('payment terms  is a required field'),
  location: yup
    .object()
    .shape({
      city: yup.string(),
      country: yup.string(),
    })
    .required(),
});

export const useJobCreateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
  const [previewModalProps, setPreviewModalProps] = useState<any>();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [skills, setSkills] = useState<Array<{ label: string; value: string }>>([]);
  const { categories } = useLoaderData().jobCategories || {};
  const catagoriesList = categories.map((item) => ({ label: item.name, value: item.id }));
  const keytems = Object.keys(SOCIAL_CAUSES);
  const causesList = keytems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });
  const selectedSkills = watch('skills');
  const paymentTypeOptions = PROJECT_PAYMENT_TYPE.slice().reverse();

  const onSelectLength = (length: ProjectLengthType) => {
    setValue('length', length, { shouldValidate: true });
  };
  const onSelectCause = (cause: SocialCauses) => {
    setValue('cause', cause, { shouldValidate: true });
  };
  const onSelectCategory = (category: string) => {
    setValue('category', category, { shouldValidate: true });
  };
  const onSelectType = (type: ProjectType) => {
    setValue('type', type, { shouldValidate: true });
  };
  const onSelectPaymentScheme = (paymentScheme: ProjectPaymentSchemeType) => {
    setValue('paymentScheme', paymentScheme, { shouldValidate: true });
  };
  const onSelectPreference = (preference: ProjectRemotePreferenceType) => {
    setValue('preference', preference, { shouldValidate: true });
  };
  const onSelectPaymentType = (paymentType: ProjectPaymentType) => {
    setValue('paymentType', paymentType, { shouldValidate: true });
  };
  const onSelectExperienceLevel = (experienceLevel: number) => {
    setValue('experienceLevel', experienceLevel, { shouldValidate: true });
  };
  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
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
  useEffect(() => {
    skillsToCategoryAdaptor().then((data) => {
      setSkills(data);
    });
  }, []);

  const onSelectCity = (location: { label: string; country: string }) => {
    setValue('location', { city: location.label, country: location.country }, { shouldValidate: true });

    // if (location.country !== undefined) {
    //   console.log('inside', location.label);
    // }
  };
  const onSubmit: SubmitHandler<Inputs> = async ({
    title,
    cause,
    description,
    category,
    experienceLevel,
    length,
    paymentMax,
    paymentMin,
    paymentScheme,
    paymentType,
    preference,
    type,
    location,
    skills,
    commitmentHoursLower,
    commitmentHoursHigher,
  }) => {
    const locationResult = location?.city ? location : {};
    let jobPayload = {
      causes_tags: [cause],
      description,
      experience_level: experienceLevel,
      job_category_id: category,
      payment_currency: 'USD',
      payment_range_higher: paymentMax.toString(),
      payment_range_lower: paymentMin.toString(),
      payment_scheme: paymentScheme,
      payment_type: paymentType,
      project_length: length,
      project_type: type,
      remote_preference: preference,
      skills: skills.map((item) => item.value),
      status: 'ACTIVE',
      title,
      commitment_hours_lower: commitmentHoursLower ? commitmentHoursLower.toString() : '',
      commitment_hours_higher: commitmentHoursHigher ? commitmentHoursHigher.toString() : '',
      // ...locationResult,
    };
    try {
      jobPayload = removedEmptyProps(jobPayload);
      await createJob(jobPayload);

      setOpenSuccessModal(true);
    } catch (error) {}
  };
  const onPreview = () => {
    const { name, description, image, mission } = currentIdentity?.meta as OrgMeta;

    const {
      title,
      description: jobDescription,
      experienceLevel,
      paymentType,
      paymentMax,
      paymentMin,
      location,
      length,
      type,
      preference,
      cause,
      skills,
    } = getValues();
    console.log('location', getValues());
    const previewModalPayload = {
      company: { name, description, image, mission },
      job: {
        title,
        description: jobDescription,
        remotePreference: PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === preference)?.label,
        isCryptoPayment: true,
        jobLength: PROJECT_LENGTH_V2.find((level) => level.value === length)?.label,
        jobType: PROJECT_TYPE_V2.find((level) => level.value === type)?.label,
        city: location?.city || 'Anywhere',
        country: location?.country,
        // location: location?.city ? location?.city : 'Anywhere',
        maxPayment: paymentMax,
        minPayment: paymentMin,
        paymentType: PROJECT_PAYMENT_TYPE.find((level) => level.value === paymentType)?.label,
        experienceLevel: EXPERIENCE_LEVEL_V2.find((level) => level.value === experienceLevel)?.label,
        socialCause: cause ? SOCIAL_CAUSES[cause].label : '',
        skills: skills ? skills.map((item) => item.label) : [],
      },
    };
    setPreviewModalProps(previewModalPayload);
    setOpenPreview(true);
  };
  const onSelectSkills = (skills) => {
    setValue('skills', skills, { shouldValidate: true });
  };
  const onChangePaymentMin = (value: string) => {
    setValue('paymentMin', value, { shouldValidate: true });
    trigger('paymentMax');
  };
  const onChangePaymentMax = (value: string) => {
    setValue('paymentMax', value, { shouldValidate: true });
    trigger('paymentMin');
  };

  const handleCloseSuccessModal = () => {
    navigate('/nowruz/jobs');
  };
  return {
    register,
    handleSubmit,
    onSubmit,
    causesList,
    catagoriesList,
    onSelectCause,
    errors,
    searchCities,
    onSelectCity,
    openPreview,
    setOpenPreview,
    openSuccessModal,
    setOpenSuccessModal,
    onPreview,
    skills,
    onSelectSkills,
    selectedSkills: selectedSkills || [],
    onSelectPreference,
    onSelectType,
    onSelectPaymentType,
    onSelectPaymentScheme,
    onSelectCategory,
    onSelectLength,
    onSelectExperienceLevel,
    previewModalProps,
    isDirty,
    isValid,
    onChangePaymentMax,
    onChangePaymentMin,
    paymentMin: getValues().paymentMin,
    paymentMax: getValues().paymentMax,
    paymentTypeOptions,
    paymentType: getValues().paymentType,
    paymentScheme: getValues().paymentScheme,
    handleCloseSuccessModal,
  };
};
