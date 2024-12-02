import { Divider } from '@mui/material';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import EmptyBox from 'src/modules/general/containers/EmptyBox';
import ServiceCard from 'src/modules/Services/components/ServiceCard';
import variables from 'src/styles/constants/_exports.module.scss';

import { useServiceList } from './useServiceList';

const ServicesList = () => {
  const {
    data: { services, page, totalPage },
    operations: { onChangePage, onServiceClick, onServiceActions },
  } = useServiceList();

  return services.length ? (
    <div className="flex flex-col gap-6">
      <Button color="primary" startIcon={<Icon name="plus" color={variables.color_white} />} customStyle="self-center">
        {translate('service-new')}
      </Button>
      {services.map(service => (
        <ServiceCard
          key={service.id}
          sample={service.samples?.[0] || ''}
          {...service}
          onCardClick={onServiceClick}
          onActions={onServiceActions}
        />
      ))}
      <Divider />
      <div className="hidden md:block">
        <Pagination page={page} count={totalPage} onChange={(_, p) => onChangePage(p)} />
      </div>
      <div className="md:hidden">
        <PaginationMobile page={page} count={totalPage} handleChange={onChangePage} />
      </div>
    </div>
  ) : (
    <EmptyBox
      icon={<FeaturedIcon iconName="search-lg" size="lg" type="modern" theme="gray" />}
      title={translate('service-empty.title')}
      subtitle={translate('service-empty.subtitle')}
      button={{
        children: translate('service-new'),
        color: 'primary',
        startIcon: <Icon name="plus" color={variables.color_white} />,
      }}
    />
  );
};

export default ServicesList;
