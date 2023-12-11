import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SOCIAL_CAUSES } from 'src/constants/SOCIAL_CAUSES';
import * as yup from 'yup';

type Inputs = {
  title: string;
};
const schema = yup.object().shape({
  title: yup.string().required(),
});

export const useJobCreateForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const { categories } = useLoaderData().jobCategories || {};
  const catagoriesList = categories.map((item) => ({ label: item.name, value: item.name }));
  console.log('catagoris', categories);
  const keytems = Object.keys(SOCIAL_CAUSES);
  const causesList = keytems.map((i) => {
    return { value: SOCIAL_CAUSES[i].value, label: SOCIAL_CAUSES[i].label };
  });

  const onSubmit: SubmitHandler<Inputs> = async ({ title }) => {
    console.log(title);
  };
  return { register, handleSubmit, onSubmit, causesList, catagoriesList };
};
