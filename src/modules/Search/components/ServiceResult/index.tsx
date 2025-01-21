import { SKILLS } from 'src/constants/SKILLS';
import { Service } from 'src/core/api';
import ServiceCard from 'src/modules/Services/components/ServiceCard';

interface ServiceResultProps {
  service: Service;
}
export const ServiceResult = ({ service }: ServiceResultProps) => {
  console.log(service);
  return (
    <ServiceCard
      id={service.id}
      sample="https://i0.wp.com/www.thewrap.com/wp-content/uploads/2022/03/alexandra-daddario.jpg?w=1200&quality=89&ssl=1"
      name={service.title}
      category={service?.job_category?.name}
      skills={service.skills.map(skill => SKILLS[skill])}
      delivery=""
      payment={'FIAT'}
      currency={{ name: '' }}
      myProfile={false}
      onCardClick={() => console.log}
    />
  );
};
