export interface ServiceCardProps {
  id: string;
  sample?: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  onCardClick: (serviceId: string) => void;
  onActions: (actionName: 'duplicate' | 'delete' | 'edit', serviceId: string) => void;
}