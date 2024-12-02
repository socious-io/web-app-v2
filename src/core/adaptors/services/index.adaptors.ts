import { services } from 'src/core/api';

import { AdaptorRes, ServicesRes } from '..';

export const getServicesAdaptor = async (page = 1, limit = 10): Promise<AdaptorRes<ServicesRes>> => {
  try {
    //TODO: adaptor and API
    // const { items: results, total_count = 0 } = await services({ page, limit });
    // const items = results?.length
    //   ? results.map(service => ({
    //       id: service.id,
    //       image: service?.image || '',
    //       name: service.name,
    //       category: service.category,
    //       delivery: service.delivery,
    //       skills: (service.skills || []).map(skill => skill.name),
    //       price: service.price,
    //       currency: service.currency,
    //     }))
    //   : [];
    return {
      data: {
        items: [
          {
            id: '1',
            image: 'test',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design', 'Illustrator', 'Logo Design'],
            delivery: '1 week',
            price: '$300',
            currency: 'USD',
          },
          {
            id: '2',
            image: 'test',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: '1 week',
            price: '$300',
            currency: 'USD',
          },
          {
            id: '3',
            image: 'test',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: '1 week',
            price: '$300',
            currency: 'USD',
          },
          {
            id: '4',
            image: 'test',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: '1 week',
            price: '$300',
            currency: 'USD',
          },
          {
            id: '5',
            name: 'Logo Design',
            category: 'Graphic Design',
            skills: ['Illustrator', 'Logo Design'],
            delivery: '1 week',
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
