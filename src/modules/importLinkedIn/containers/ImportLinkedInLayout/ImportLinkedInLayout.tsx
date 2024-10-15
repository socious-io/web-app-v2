import React, { ReactNode } from 'react';
import { Button } from 'src/modules/general/components/Button';
import { IconDropDown } from 'src/modules/general/components/iconDropDown';

import css from './importLinkedInLayout.module.scss';
import { useImportLinkedInLayout } from './useImportLinkedInLayout';
import { LinkedInProvider } from '../../contexts/linkedin.context';

export interface ImportLinkedInLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}
export const ImportLinkedInLayout: React.FC<ImportLinkedInLayoutProps> = ({ children, title, subtitle }) => {
  const isMobile = window.innerWidth < 600;
  const {
    data: { items, accounts },
  } = useImportLinkedInLayout();
  return (
    <LinkedInProvider>
      <div className="w-full h-dvh flex flex-col">
        <div className="w-full flex justify-between">
          <img className={css.headerImage} src={isMobile ? '/icons/logo.svg' : '/icons/logo-text.svg'} alt="" />
          <IconDropDown iconItems={items} type="users" accounts={accounts} />
        </div>
        <div className={css.container}>
          <div className={css.content}>
            <div className={css.header}>
              <div className={css.title}>{title}</div>
              <div className={css.title}>{subtitle}</div>
            </div>
            {children}
          </div>
          <Button variant="contained" color="primary" fullWidth>
            Next: Education
          </Button>
        </div>
      </div>
    </LinkedInProvider>
  );
};
