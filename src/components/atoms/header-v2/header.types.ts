export type HeaderLabel = { label: string; onClick: () => void };

export type HeaderProps = {
  title: string;
  onBack?: () => void;
  right?: HeaderLabel | JSX.Element;
};
