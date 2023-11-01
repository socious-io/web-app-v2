import * as yup from 'yup';

export const formModel = {
  email: '',
  password: '',
};

export const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();
