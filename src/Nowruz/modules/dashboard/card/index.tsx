import { FeaturedIcon } from 'src/Nowruz/modules/general/components/featuredIcon-new';

export interface CardProps {
  cardText: string;
  iconName: string;
  number?: string | number;
  unit?: string;
}

export const Card: React.FC<CardProps> = (props) => {
  const { cardText, number, iconName, unit } = props;
  return (
    <div className="bg-white rounded-lg p-6 border border-solid  border-Gray-light-mode-200">
      <div className="flex flex-col items-start gap-4">
        <FeaturedIcon iconName={iconName} size="lg" theme="gray" type="modern" />
        <p className="text-sm text-gray-600">{cardText}</p>
        <div className="flex flex-row items-end gap-1">
          <p className="text-3xl text-gray-600 font-bold">{number}</p>
          <p className="text-sm text-gray-600">{unit}</p>
        </div>
      </div>
    </div>
  );
};
