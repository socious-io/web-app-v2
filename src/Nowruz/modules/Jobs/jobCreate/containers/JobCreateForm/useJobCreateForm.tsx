import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { EXPERIENCE_LEVEL_V2 } from 'src/constants/EXPERIENCE_LEVEL';
import { PROJECT_LENGTH_V2 } from 'src/constants/PROJECT_LENGTH';
import { PROJECT_PAYMENT_TYPE } from 'src/constants/PROJECT_PAYMENT_TYPE';
import { PROJECT_REMOTE_PREFERENCES_V2 } from 'src/constants/PROJECT_REMOTE_PREFERENCE';
import { PROJECT_TYPE_V2 } from 'src/constants/PROJECT_TYPES';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { skillsToCategory, skillsToCategoryAdaptor } from 'src/core/adaptors';
import {
  CurrentIdentity,
  Job,
  Location,
  OrgMeta,
  QuestionReq,
  addQuestionJob,
  createJob,
  searchLocation,
  updateJob,
} from 'src/core/api';
import { RootState } from 'src/store';
import * as yup from 'yup';

type LocationInput =
  | {
      city: string;
      country: string;
      label: string;
    }
  | undefined;

interface OptionType {
  value: string;
  label: string;
}

interface OptionNumber {
  value: number;
  label: string;
}

type Inputs = {
  title: string;
  cause: OptionType;
  description: string;
  category: OptionType;
  paymentMin: number;
  paymentMax: number;
  commitmentHoursLower: number;
  commitmentHoursHigher: number;
  skills: Array<{ label: string; value: string }>;
  preference: OptionType;
  type: OptionType;
  length: OptionType;
  location?: LocationInput;
  paymentType: string;
  paymentScheme: string;
  experienceLevel: OptionNumber;
  jobLocation: string;
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters').required(),
  cause: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
  description: yup.string().required('Required'),
  category: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
  experienceLevel: yup.object().shape({
    label: yup.string().required(),
    value: yup.number().required(),
  }),
  length: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
  paymentMin: yup.number().lessThan(yup.ref('paymentMax'), 'Max price must be higher than min price'),
  paymentMax: yup.number().moreThan(yup.ref('paymentMin'), 'Max price must be higher than min price'),
  commitmentHoursLower: yup
    .number()
    .lessThan(yup.ref('commitmentHoursHigher'), 'Max hours must be higher than min hours'),
  commitmentHoursHigher: yup
    .number()
    .moreThan(yup.ref('commitmentHoursLower'), 'Max hours must be higher than min hours'),
  skills: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    )
    .required('Required'),
  preference: yup.object().shape({
    label: yup.string(),
    value: yup.string(),
  }),
  paymentType: yup.string().required('Required'),
  type: yup.object().shape({
    label: yup.string().required(),
    value: yup.string().required(),
  }),
  paymentScheme: yup.string().required('Required'),
  location: yup
    .object()
    .shape({
      city: yup.string(),
      country: yup.string(),
      label: yup.string(),
    })
    .required('Required'),
  jobLocation: yup.string().required('Required'),
});

export const useJobCreateForm = () => {
  const { categories } = useLoaderData().jobCategories || {};
  const jobDetail = useLoaderData().jobDetail as Job;
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors, isDirty, isValid },
    trigger,
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const currentIdentity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });
  const location = useLocation();
  const [isEdit] = useState<boolean>(location.pathname.includes('jobs/edit') ?? false);
  const navigate = useNavigate();
  const [openPreview, setOpenPreview] = useState(false);
  const [previewModalProps, setPreviewModalProps] = useState<any>();
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [skills, setSkills] = useState<Array<{ label: string; value: string }>>([]);

  const [questions, setQuestions] = useState<QuestionReq[]>([]);
  const [editedQuestion, setEditedQuestion] = useState<QuestionReq>();
  const [editedQuestionIndex, setEditedQuestionIndex] = useState();
  const [openCreateQuestion, setOpenCreateQuestion] = useState(false);
  const catagoriesList = categories.map((item) => ({ label: item.name, value: item.id }));
  const keytems = Object.keys(SOCIAL_CAUSES);
  const causesList = keytems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });
  let selectedSkills = watch('skills');
  const paymentTypeOptions = PROJECT_PAYMENT_TYPE.slice().reverse();

  const onSelectLength = (length: OptionType) => {
    setValue('length', length, { shouldValidate: true });
  };
  const onSelectCause = (cause: OptionType) => {
    setValue('cause', cause, { shouldValidate: true });
  };
  const onSelectCategory = (category: OptionType) => {
    setValue('category', category, { shouldValidate: true });
  };
  const onSelectType = (type: OptionType) => {
    setValue('type', type, { shouldValidate: true });
  };
  const onSelectPaymentScheme = (paymentScheme: string) => {
    setValue('paymentScheme', paymentScheme, { shouldValidate: true });
  };
  const onSelectPreference = (preference: OptionType) => {
    setValue('preference', preference, { shouldValidate: true });
  };
  const onSelectPaymentType = (paymentType: string) => {
    setValue('paymentType', paymentType, { shouldValidate: true });
  };
  const onSelectExperienceLevel = (experienceLevel: OptionNumber) => {
    setValue('experienceLevel', experienceLevel, { shouldValidate: true });
  };

  const onSelectJobLocation = (jobLocation: string) => {
    setValue('jobLocation', jobLocation);
  };

  const cityToOption = (cities: Location[]) => {
    return cities.map((city) => ({
      // label: `${city.name}, ${city.region_name}`,
      // countryCode: city.country_code,
      label: JSON.stringify({ label: `${city.name}, ${city.country_name}`, description: city.timezone_utc }),
      countryCode: city.country_code,
      city: city.name,
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

  const onSelectCity = (location) => {
    setValue(
      'location',
      { city: location.city, country: location.countryCode, label: `${location.city}, ${location.countryCode}` },
      { shouldValidate: true },
    );
  };

  const addQuestion = (q: QuestionReq) => {
    setQuestions(questions.concat(q));
    setOpenCreateQuestion(false);
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
    const locationResult = location?.city !== 'Anywhere' ? { city: location?.city, country: location?.country } : {};
    const jobPayload = {
      causes_tags: [cause.value],
      description,
      experience_level: experienceLevel.value.toString(),
      job_category_id: category.value,
      payment_currency: 'USD',
      payment_range_higher: paymentMax ? paymentMax.toString() : '',
      payment_range_lower: paymentMin ? paymentMin.toString() : '',
      payment_scheme: paymentScheme,
      payment_type: paymentType,
      project_length: length.value,
      project_type: type.value,
      remote_preference: preference.value,
      skills: skills.map((item) => item.value),
      status: 'ACTIVE',
      title,
      commitment_hours_lower: commitmentHoursLower ? commitmentHoursLower.toString() : '',
      commitment_hours_higher: commitmentHoursHigher ? commitmentHoursHigher.toString() : '',
      ...locationResult,
    };

    try {
      const res = await createJob(jobPayload);
      questions.forEach(async (q) => {
        await addQuestionJob(res.id, q);
      });
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
  const onSelectSkills = (skills: Array<OptionType>) => {
    setValue('skills', skills, { shouldValidate: true });
  };
  const onChangePaymentMin = (value: string) => {
    setValue('paymentMin', Number(value), { shouldValidate: true });
    trigger('paymentMax');
  };
  const onChangePaymentMax = (value: string) => {
    setValue('paymentMax', Number(value), { shouldValidate: true });
    trigger('paymentMin');
  };
  const onChangeCommitHoursMin = (value: string) => {
    setValue('commitmentHoursLower', Number(value), { shouldValidate: true });
    trigger('commitmentHoursHigher');
  };
  const onChangeCommitHoursMax = (value: string) => {
    setValue('commitmentHoursHigher', Number(value), { shouldValidate: true });
    trigger('commitmentHoursLower');
  };

  const handleCloseSuccessModal = () => {
    navigate('/jobs/created');
  };

  const deleteQuestion = (index: number) => {
    const q = [...questions];
    q.splice(index, 1);
    setQuestions(q);
  };

  const openEditQuestionForm = (index: number) => {
    setEditedQuestion(questions[index]);
    setEditedQuestionIndex(index);
    setOpenCreateQuestion(true);
  };

  const handleEditQuestion = (editedQ: QuestionReq) => {
    const q = [...questions];
    q[editedQuestionIndex] = editedQ;
    setQuestions(q);
    setEditedQuestion(undefined);
    setEditedQuestionIndex(undefined);
    setOpenCreateQuestion(false);
  };

  const initializeValues = useCallback(
    (job: Job) => {
      const preferences = PROJECT_REMOTE_PREFERENCES_V2.find((level) => level.value === job.remote_preference)?.label;
      const initialVal = {
        title: job?.title || '',
        cause: {
          label: SOCIAL_CAUSES[job?.causes_tags?.[0]].label || '',
          value: job?.causes_tags?.[0] || '',
        },
        category: {
          label: job?.job_category?.name || '',
          value: job?.job_category?.id || '',
        },
        description: job.description,
        preference: { label: preferences, value: job.remote_preference },
        type: {
          label: PROJECT_TYPE_V2.find((type) => type.value === job?.project_type)?.label,
          value: job?.project_type || '',
        },
        length: {
          label: PROJECT_LENGTH_V2.find((length) => length.value === job?.project_length)?.label,
          value: job?.project_length || '',
        },
        experienceLevel: {
          label: EXPERIENCE_LEVEL_V2.find((experience) => experience.value === job?.experience_level)?.label,
          value: job?.experience_level,
        },
        skills: skillsToCategory(job?.skills),
        paymentType: job?.payment_type,
        paymentScheme: job?.payment_scheme,
        location: job?.city ? { city: job.city, country: job.country, label: `${job.city}, ${job.country}` } : {},
        paymentMin: Number(job?.payment_range_lower) || 0,
        paymentMax: Number(job?.payment_range_higher) || 0,
        jobLocation: job.city ? 'Country / City' : 'Anywhere',
        // commitmentHoursLower: Number(job?.commitment_hours_lower) || 0,
        // commitmentHoursHigher: Number(job?.commitment_hours_higher) || 0,
      };
      reset(initialVal);
    },
    [reset],
  );

  useEffect(() => {
    if (jobDetail && isEdit) {
      if (jobDetail.city) {
        //setValue('location', { city: jobDetail.city, country: jobDetail.country }, { shouldValidate: true });
      }
      initializeValues(jobDetail);
    }
  }, [jobDetail, isEdit, initializeValues, setValue]);

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
    onChangeCommitHoursMin,
    onChangeCommitHoursMax,
    commitmentHoursHigher: getValues().commitmentHoursHigher,
    commitmentHoursLower: getValues().commitmentHoursLower,
    questions,
    addQuestion,
    openCreateQuestion,
    setOpenCreateQuestion,
    deleteQuestion,
    openEditQuestionForm,
    handleEditQuestion,
    editedQuestion,
    isEdit,
    cause: getValues().cause,
    category: getValues().category,
    preference: getValues().preference,
    type: getValues().type,
    length: getValues().length,
    experienceLevel: getValues().experienceLevel,
    location: getValues().location,
    onSelectJobLocation,
    jobLocation: getValues().jobLocation,
  };
};
