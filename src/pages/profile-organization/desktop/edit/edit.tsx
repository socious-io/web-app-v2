import { Header } from 'src/components/atoms/header-v2/header';
import css from './edit.module.scss';
import { Modal } from 'src/components/templates/modal/modal';
import { Textarea } from 'src/components/atoms/textarea/textarea';
import { Dropdown } from 'src/components/atoms/dropdown-v2/dropdown';
import { COUNTRIES } from 'src/constants/COUNTRIES';
import { COUNTRY_CODES } from 'src/constants/COUNTRY_CODE';
import { Category } from 'src/components/molecules/category/category';
import { skillsToCategoryAdaptor, socialCausesToCategoryAdaptor } from 'src/core/adaptors';
import { ProfileReq } from 'src/pages/profile-organization/profile-organization.types';
import { useMatch } from '@tanstack/react-location';
import { useMemo } from 'react';
import { useForm } from 'src/core/form/useForm/useForm';
import { useProfileUserEditShared } from 'src/pages/profile-user-edit/profile-user-edit.shared';
import { generateFormModel } from 'src/pages/profile-user-edit/profile-user-edit.form';
import { Input } from 'src/components/atoms/input/input';
import { EditProps } from './edit.types';
import { getFormValues } from 'src/core/form/customValidators/formValues';
import { endpoint } from 'src/core/endpoints';

export const EditOrganization = (props: EditProps): JSX.Element => {
  return (
    <Modal height={props.height} width={props.width} open={props.open} onClose={props.onClose}>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore quibusdam sequi sint perferendis error laboriosam
      autem quasi odio. Repudiandae quia eos incidunt maiores sunt debitis possimus modi quo earum temporibus!
    </Modal>
  );
};
