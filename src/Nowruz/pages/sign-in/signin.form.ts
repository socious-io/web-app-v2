import * as yup from 'yup';

export const formModel = {
  email: '',
  password: '',
};

export const schema = yup
  .object()
  .shape({
    email: yup.string().email('Enter a correct email').required('Enter a correct email'),
    password: yup.string().required('Enter a correct password'),
  })
  .required();
