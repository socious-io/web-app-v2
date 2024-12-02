import { services } from 'src/core/api';
import { translate } from 'src/core/utils';

import { AdaptorRes, ServicesRes } from '..';

export const getServicesAdaptor = async (
  page = 1,
  limit = 10,
  filters?: { kind?: 'SERVICE' },
): Promise<AdaptorRes<ServicesRes>> => {
  try {
    const { results, total_count = 0 } = await services({ page, limit }, filters);
    const items = results?.length
      ? results.map(service => ({
          id: service.id,
          samples: (service?.work_samples || []).map(sample => sample.url),
          name: service.title,
          //FIXME: in next PR translate added
          category: service.job_category.name,
          delivery: service.project_length,
          skills: (service.skills || []).map(skill => translate(skill)),
          price: service.payment_range_higher,
          currency: service.payment_currency,
        }))
      : [];
    return {
      data: {
        items,
        page,
        limit,
        total_count,
      },
      error: null,
    };
  } catch (error) {
    console.error('Error in getting services List: ', error);
    return { data: null, error: 'Error in getting services List' };
  }
};
