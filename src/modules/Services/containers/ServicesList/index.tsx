import { Divider } from '@mui/material';
import { translate } from 'src/core/utils';
import { Button } from 'src/modules/general/components/Button';
import { FeaturedIcon } from 'src/modules/general/components/featuredIcon-new';
import { Icon } from 'src/modules/general/components/Icon';
import { Pagination } from 'src/modules/general/components/Pagination';
import { PaginationMobile } from 'src/modules/general/components/paginationMobile';
import ConfirmModal from 'src/modules/general/containers/ConfirmModal';
import EmptyBox from 'src/modules/general/containers/EmptyBox';
import ServiceCard from 'src/modules/Services/components/ServiceCard';
import variables from 'src/styles/constants/_exports.module.scss';

import { useServiceList } from './useServiceList';

const ServicesList = () => {
  const {
    data: { myProfile, services, page, totalPage, openDeleteModal },
    operations: {
      onChangePage,
      onServiceClick,
      onServiceActions,
      onCreateService,
      setOpenDeleteModal,
      onDeleteService,
    },
  } = useServiceList();

  return services.length ? (
    <>
      <div className="flex flex-col gap-6">
        {myProfile && (
          <Button
            color="primary"
            startIcon={<Icon name="plus" color={variables.color_white} />}
            customStyle="self-center"
            onClick={onCreateService}
          >
            {translate('service-new')}
          </Button>
        )}
        {services.map(service => (
          <ServiceCard
            key={service.id}
            {...service}
            sample={service.samples ? service.samples[0]?.url : ''}
            currency={service.currency.name}
            myProfile={myProfile}
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
      <ConfirmModal
        open={!!openDeleteModal}
        handleClose={() => setOpenDeleteModal('')}
        title={<FeaturedIcon iconName="alert-circle" size="lg" theme="warning" type="light-circle-outlined" />}
        confirmHeader={translate('service-delete.title')}
        confirmSubheader={translate('service-delete.subtitle')}
        buttons={[
          {
            children: translate('service-delete.cancel-button'),
            color: 'info',
            variant: 'outlined',
            onClick: () => setOpenDeleteModal(''),
            customStyle: 'w-full',
          },
          {
            children: translate('service-delete.delete-button'),
            color: 'error',
            variant: 'contained',
            onClick: onDeleteService,
            customStyle: 'w-full',
          },
        ]}
        customStyle="md:max-w-[400px]"
      />
    </>
  ) : (
    <EmptyBox
      icon={<FeaturedIcon iconName="search-lg" size="lg" type="modern" theme="gray" />}
      title={translate('service-empty.title')}
      subtitle={translate('service-empty.subtitle')}
      button={{
        children: translate('service-new'),
        color: 'primary',
        startIcon: <Icon name="plus" color={variables.color_white} />,
        onClick: onCreateService,
      }}
    />
  );
};

export default ServicesList;
