import css from './alert-confirm.module.scss';
import { ConfirmOptions } from '@capacitor/dialog';
import { Button } from 'src/components/atoms/button/button';

export type AlertConfirmProps = {
  options: ConfirmOptions;
  onConfirm: () => void;
  onClose: () => void;
};

export function AlertConfirm(props: AlertConfirmProps) {
  return (
    <div className={css.container}>
      <div className={css.title}>{props.options.title}</div>
      <div className={css.message}>{props.options.message}</div>
      <Button onClick={props.onConfirm}>Confirm</Button>
      <Button onClick={props.onClose} color="white">
        Cancel
      </Button>
    </div>
  );
}
