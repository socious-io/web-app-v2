import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectPaymentType } from 'src/core/api';
import * as yup from 'yup';

type Inputs = {
  title: string;
  paymentType: ProjectPaymentType;
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters').required(),
  paymentType: yup.string(),
});
const useOrgOffer = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  return { register };
};

export default useOrgOffer;
