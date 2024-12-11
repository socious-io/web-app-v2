import {
  services,
  service,
  createService,
  updateService,
  duplicateService,
  deleteService,
  StripeAccount,
  stripeProfile,
} from 'src/core/api';
import { translate } from 'src/core/utils';

import { AdaptorRes, PaymentMode, ServiceReq, ServicesRes, SuccessRes } from '..';

export const getServicesAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ServicesRes>> => {
  try {
    //TODO: adaptor and API
    // const { items: results, total_count = 0 } = await services({ page, limit });
    // const items = results?.length
    //   ? results.map(service => ({
    //       id: service.id,
    //       images: service?.images || '',
    //       name: service.name,
    //       category: service.category,
    //       delivery: translate(`service-form.delivery-options.${service.delivery}`),
    //       skills: (service.skills || []).map(skill => translate(skill.name)),
    //       price: service.price,
    //       currency: service.currency,
    //     }))
    //   : [];
    return {
      data: {
        items: [
          {
            id: '1',
            images: ['test'],
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design', 'Illustrator', 'Logo Design'],
            delivery: translate(`service-form.delivery-options.${'1_WEEK'}`),
            price: '$300',
            currency: 'USD',
          },
          {
            id: '2',
            images: ['test'],
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: translate(`service-form.delivery-options.${'1_WEEK'}`),
            price: '$300',
            currency: 'USD',
          },
          {
            id: '3',
            images: ['test'],
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: translate(`service-form.delivery-options.${'1_WEEK'}`),
            price: '$300',
            currency: 'USD',
          },
          {
            id: '4',
            images: ['test'],
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: translate(`service-form.delivery-options.${'1_WEEK'}`),
            price: '$300',
            currency: 'USD',
          },
          {
            id: '5',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: translate(`service-form.delivery-options.${'1_WEEK'}`),
            price: '$300',
            currency: 'USD',
          },
        ],
        page,
        limit,
        total_count: 1,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting services List: ', error);
    return { data: null, error: 'Error in getting services List' };
  }
};

export const getServiceAdaptor = async (serviceId: string): Promise<AdaptorRes<ServiceReq>> => {
  try {
    //TODO: adaptor and API
    // const res = await service(serviceId);
    const res = {
      id: serviceId,
      name: 'Logo Design',
      description: 'desc test',
      category: 'fbacde54-88e6-4d17-8aa9-286a716ba12f',
      delivery: '1_WEEK',
      hours: '24',
      payment: 'FIAT' as PaymentMode,
      price: '300',
      currency: 'USD',
      skills: ['ADOBE_ILLUSTRATOR', 'ADOBE_PHOTOSHOP', 'GOOGLE_ANALYTICS'],
      images: ['test'],
      account: { id: '12345', type: 'users', name: 'Sanaz Mahmoudi', username: 'mahmoudisanaz59' },
    };
    return {
      data: res,
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
  try {
    //TODO: adaptor and API
    // if (serviceId) {
    //   duplicate ? await duplicateService(serviceId, payload) : await updateService(serviceId, payload);
    // } else {
    //   await createService(payload);
    // }
    return { data: { message: 'succeed' }, error: null };
  } catch (error) {
    console.error('Error in adding/updating a service', error);
    return { data: null, error: 'Error in adding/updating a service' };
  }
};

export const deleteServiceAdaptor = async (serviceId: string): Promise<AdaptorRes<SuccessRes>> => {
  try {
    //TODO: adaptor and API
    // await deleteService(serviceId);
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
