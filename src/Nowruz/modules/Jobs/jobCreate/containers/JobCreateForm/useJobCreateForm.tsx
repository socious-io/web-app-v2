import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import { skillsToCategoryAdaptor } from 'src/core/adaptors';
import { Location, searchLocation, skills } from 'src/core/api';
import * as yup from 'yup';

type Inputs = {
  title: string;
  cause: string;
  description: string;
  category: string;
  paymentMin: number;
  paymentMax: number;
  skills?: string[];
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters').required(),
  cause: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  paymentMin: yup.number().required().lessThan(yup.ref('paymentMax'), 'Max price must be higher than min price'),
  paymentMax: yup.number().required().moreThan(yup.ref('paymentMin'), 'Max price must be higher than min price'),
  skills: yup.array().of(yup.string()),
});

export const useJobCreateForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const [openPreview, setOpenPreview] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [skills, setSkills] = useState<Array<{ label: string; value: string }>>([]);
  const { categories } = useLoaderData().jobCategories || {};
  const catagoriesList = categories.map((item) => ({ label: item.name, value: item.id }));
  const keytems = Object.keys(SOCIAL_CAUSES);
  const causesList = keytems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const onSelectCause = (cause: string) => {
    setValue('cause', cause);
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

  const onSelectCity = () => {};
  const onSubmit: SubmitHandler<Inputs> = async ({ title, cause, description }) => {
    console.log(title, cause, description);
  };
  const onPreview = () => {
    console.log('preview');
    const allFormValues = getValues();
    console.log(allFormValues);
  };
  const onSelectSkills = (skills) => {
    console.log('set skills', skills);
    setValue('skills', skills);
  };
  const selectedSkills = watch('skills');
  console.log('skills', selectedSkills);
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
  };
};
