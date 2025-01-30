import { PaymentMode } from 'src/core/api';

import { PaginateRes } from '..';

export type WorkSample = {
  id: string;
  url: string;
};

export type CurrencyDetail = { name: string; symbol?: string; address?: string };

export interface Service {
  id: string;
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: CurrencyDetail;
  samples?: WorkSample[];
  description: string;
  hours: string;
  payment: PaymentMode;
  identity?: { id: string; type: string; name: string; username: string; usernameVal: string; img?: string };
}

export type ServicesRes = PaginateRes<Service>;

export interface ServiceReq {
  name: string;
  category: string;
  skills: string[];
  delivery: string;
  price: string;
  currency: string;
  description: string;
  hours: string;
  payment: PaymentMode;
  samples: string[];
}

export interface ServiceDetails {
  id: string;
  avatarUrl?: string;
  subtitle?: string;
  sample?: string;
  name?: string;
  category?: string;
  skills: string[];
  delivery: string;
  payment: PaymentMode;
  price?: string;
  currency: CurrencyDetail;
  myProfile: boolean;
  onCardClick: (serviceId: string) => void;
  hasAvatar?: boolean;
  onActions?: (actionName: 'duplicate' | 'delete' | 'edit', serviceId: string) => void;
}
