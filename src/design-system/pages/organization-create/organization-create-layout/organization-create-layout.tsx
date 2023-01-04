import css from './organization-create-layout.module.scss';
import { Outlet } from '@tanstack/react-location';
import { Header } from '../../../atoms/header/header';

export const OrganizationCreateLayout = (): JSX.Element => {
  return (
    <div className={css.container}>
      <Header height="var(--safe-area)" title="bullets" />
      <Outlet />
    </div>
  );
};
