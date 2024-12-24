import {
  services,
  service,
  createService,
  updateService,
  deleteService,
  StripeAccount,
  stripeProfile,
} from 'src/core/api';
import { getIdentityMeta, translate } from 'src/core/utils';

import { AdaptorRes, PaymentMode, Service, ServiceReq, ServicesRes, SuccessRes } from '..';

export const getServicesAdaptor = async (
  page = 1,
  limit = 10,
  filters?: { kind?: 'SERVICE' },
): Promise<AdaptorRes<ServicesRes>> => {
  try {
    const { results, total } = await services({ page, limit }, filters);
    const items = results?.length
      ? results.map(service => ({
          id: service.id,
          samples: (service?.work_samples || []).map(sample => ({ id: sample.id, url: sample.url })),
          name: service.title,
          category: service.job_category.name,
          delivery: translate(`service-form.delivery-options.${service.project_length}`),
          skills: (service.skills || []).map(skill => translate(skill)),
          price: service.payment_range_higher,
          currency: service.payment_currency,
          description: service.description,
          hours: service.commitment_hours_higher,
          payment: service.payment_mode,
        }))
      : [];
    return {
      data: {
        items,
        page,
        limit,
        total,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting services List: ', error);
    return { data: null, error: 'Error in getting services List' };
  }
};

export const getServiceAdaptor = async (serviceId: string): Promise<AdaptorRes<Service>> => {
  try {
    const serviceDetail = await service(serviceId);
    const { name, username, usernameVal, profileImage, type = 'users' } = getIdentityMeta(serviceDetail.identity);
    const data = {
      id: serviceDetail.id,
      name: serviceDetail.title,
      description: serviceDetail.description,
      category: serviceDetail.job_category_id,
      delivery: serviceDetail.project_length,
      hours: serviceDetail.commitment_hours_higher,
      payment: serviceDetail.payment_mode as PaymentMode,
      price: serviceDetail.payment_range_higher,
      currency: serviceDetail.payment_currency,
      skills: serviceDetail.skills,
      samples: (serviceDetail?.work_samples || []).map(sample => ({ id: sample.id, url: sample.url })),
      identity: {
        id: serviceDetail.identity.id,
        type,
        name,
        username,
        usernameVal,
        img: profileImage,
      },
    };
    return {
      data,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting service detail: ', error);
    return { data: null, error: 'Error in getting service detail' };
  }
};

export const createOrUpdateServiceAdaptor = async (
  payload: ServiceReq,
  serviceId?: string,
  duplicate?: boolean,
): Promise<AdaptorRes<SuccessRes>> => {
  const newPayload = {
    title: payload.name,
    description: payload.description,
    payment_currency: payload.currency,
    skills: payload.skills,
    job_category_id: payload.category,
    project_length: payload.delivery,
    commitment_hours_lower: payload.hours,
    commitment_hours_higher: payload.hours,
    payment_mode: payload.payment as PaymentMode,
    payment_range_lower: payload.price,
    payment_range_higher: payload.price,
    work_samples: payload?.samples || [],
    kind: 'SERVICE' as const,
  };
  try {
    if (serviceId && !duplicate) {
      updateService(serviceId, newPayload);
    } else {
      createService(newPayload);
    }
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in adding/updating a service', error);
    return { data: null, error: 'Error in adding/updating a service' };
  }
};

export const deleteServiceAdaptor = async (serviceId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    await deleteService(serviceId);
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in deleting service', error);
    return { data: null, error: 'Error in deleting service' };
  }
};

export const getStripAccountsAdaptor = async (): Promise<AdaptorRes<StripeAccount[]>> => {
  try {
    const requests = [stripeProfile({}), stripeProfile({ is_jp: true })];
    const [stripeProfileRes, jpStripeProfileRes] = await Promise.all(requests);
    const stripeAccounts: StripeAccount[] = [
      ...(stripeProfileRes?.external_accounts?.data || []),
      ...(jpStripeProfileRes?.external_accounts?.data || []),
    ];
    return {
      data: stripeAccounts,
      error: null,
    };
  } catch (error) {
    console.error('Error in getting stripe accounts', error);
    return { data: null, error: 'Error in getting stripe accounts' };
  }
};
