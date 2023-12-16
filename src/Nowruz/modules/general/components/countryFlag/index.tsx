import * as Flags from 'country-flag-icons/react/1x1';

interface CountryFlagProps {
  countryCode: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ countryCode }) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className="w-6 h-5 rounded-3xl" />;
};
