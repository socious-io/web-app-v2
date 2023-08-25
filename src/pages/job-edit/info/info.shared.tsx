import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { useForm } from 'src/core/form';
import { formModel } from './info.form';
import { DropdownItem } from '@atoms/dropdown-v2/dropdown.types';
import { getCityList, updateForm } from './info.services';
import { citiesToCategories } from 'src/core/adaptors';
import { CreatePostWizard } from 'src/store/reducers/createPostWizard.reducer';

export const useInfoShared = () => {
  const dispatch = useDispatch();
  const updateField = updateForm(dispatch);
  const [cities, setCities] = useState<DropdownItem[]>([]);
  const formState = useSelector<RootState, CreatePostWizard>((state) => state.createPostWizard);
  
  const memoizedFormState = useMemo(
    () => formModel(formState),
    [formState.payment_range_lower, formState.payment_range_higher]
  );
  const form = useForm(memoizedFormState);
  const controlErrors =
    { ...form.controls.payment_range_lower?.errors, ...form.controls.payment_range_higher?.errors } || {};
  const errors = Object.values(controlErrors) as string[];
  const label = `${formState.payment_type}-${formState.payment_scheme}`;

  const rangeLabel: Record<string, string> = {
    'PAID-FIXED': 'Payment range',
    'PAID-HOURLY': 'Hourly rate',
    'VOLUNTEER-FIXED': 'Total commitment',
    'VOLUNTEER-HOURLY': 'Weekly hours',
  };

  Object.keys(formModel(formState)).forEach((prop) => {
    const p = prop as keyof ReturnType<typeof formModel>;
    form.controls[prop].subscribe((v) => {
      updateField(p, v);
    });
  });

  function updateCityList(countryCode: string) {
    getCityList(countryCode)
      .then(({ items }) => citiesToCategories(items))
      .then(setCities);
  }

  return {
    formState,
    form,
    updateCityList,
    cities,
    errors,
    rangeLabel: rangeLabel[label],
  };
};
