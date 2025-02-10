import { Organization } from 'src/core/api';
import { SelectProps } from 'src/modules/general/components/SearchDropdown/search-dropdown.types';

export type CompanySearchDropdownProps = SelectProps & { onSetCompanies?: (companies: Organization[]) => void };
