import * as yup from 'yup';

export const formModel = {
  email: '',
};

export const schema = yup
  .object()
  .shape({
    email: yup.string().email().required(),
  })
  .required();
