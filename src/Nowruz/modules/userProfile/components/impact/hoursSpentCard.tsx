import { Icon } from 'src/Nowruz/general/Icon';

export interface HoursSpentCardProps {
  cardText: string;
  hours: number;
}

export const HoursSpentCard: React.FC<HoursSpentCardProps> = (props) => {
  return (
    <div className="bg-white rounded-lg border border-solid p-6 border border-Gray-light-mode-200">
      <div className="flex flex-col items-start gap-4">
        <div className="rounded-lg border border-solid border-Gray-light-mode-200 p-2">
          <Icon fontSize={24} name="clock" className="text-Gray-light-mode-700" />
        </div>
        <p className="text-sm text-gray-600">{props.cardText}</p>
        <div className="flex flex-row items-end gap-1">
          <p className="text-3xl text-gray-600 font-bold">{props.hours}</p>
          <p className="text-sm text-gray-600">hrs</p>
        </div>
      </div>
    </div>
  );
}