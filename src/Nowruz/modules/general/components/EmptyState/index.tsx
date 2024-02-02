import type { FC, ReactNode } from 'react';

export type EmptyStateProps = {
  icon: ReactNode;
  message: string;
  button?: ReactNode;
};

export const EmptyState: FC<EmptyStateProps> = ({ icon, message, button }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 w-full p-4 border border-solid border-Gray-light-mode-200 rounded-xl">
      {icon && <div className="p-2 w-12 h-12 border border-solid border-Gray-light-mode-200 rounded-xl">{icon}</div>}
      {message && <p className="font-semibold text-center leading-6">{message}</p>}
      {button && button}
    </div>
  );
};
