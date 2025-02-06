import React from 'react';
import { OptionType } from 'src/core/adaptors';
import { Organization, search } from 'src/core/api';
import { Avatar } from 'src/modules/general/components/avatar/avatar';
import { SearchDropdown } from 'src/modules/general/components/SearchDropdown';

import { CompanySearchDropdownProps } from './index.types';

const CompanySearchDropdown: React.FC<CompanySearchDropdownProps> = ({
  value,
  onChange,
  errors,
  onSetCompanies,
  ...rest
}) => {
  const searchCompanies = async (searchText: string, cb: (options: any) => void) => {
    try {
      if (searchText) {
        const response = await search(
          {
            type: 'organizations',
            q: searchText,
            filter: {},
            sort: {
              verified: 'desc',
            },
          },
          { page: 1, limit: 10 },
        );
        onSetCompanies?.(response.items);
        cb(orgToOption(response.items));
      }
    } catch (error) {
      console.error('Error fetching company data:', error);
    }
  };
  const orgToOption = (orgs: Organization[]) => {
    let options: OptionType[] = [];
    options = orgs.map(org => ({
      value: org.id,
      label: org?.name,
      icon: (
        <Avatar
          type="organizations"
          img={org?.image?.url || ''}
          isVerified={org.verified}
          size="24px"
          badgeSize="12px"
        />
      ),
    }));
    return options;
  };
  return (
    <SearchDropdown
      isClearable
      id="company"
      value={value}
      placeholder="Search for a company"
      isAsync
      creatable
      loadOptions={searchCompanies}
      icon="search-lg"
      hasDropdownIcon={false}
      label="Company"
      onChange={onChange}
      errors={errors}
      {...rest}
    />
  );
};
export default CompanySearchDropdown;
