import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import variables from 'src/components/_exports.module.scss';
import { Contract, CurrentIdentity } from 'src/core/api';
import { Icon } from 'src/Nowruz/general/Icon';
import { Dot } from 'src/Nowruz/modules/general/components/dot';
import { RootState } from 'src/store';
import { setSelected } from 'src/store/reducers/contracts.reducer';

export const useContractCard = (contract: Contract, setOpenOverlay: (val: boolean) => void) => {
  const [contractVal, setContractVal] = useState(contract);
  const identity = useSelector<RootState, CurrentIdentity | undefined>((state) => {
    return state.identity.entities.find((identity) => identity.current);
  });

  const type = identity?.type;

  const name = type === 'users' ? contractVal.offerer.meta.name : contractVal.recipient.meta.name;
  const profileImageUrl = type === 'users' ? contractVal.offerer.meta.image : contractVal.recipient.meta.avatar;

  const dispatch = useDispatch();

  useEffect(() => {
    setContractVal(contract);
  }, [contract]);

  // We might delete currency icon later (we accept only USD or JPY at the moment)
  const currencyIconName = (() => {
    switch (contractVal.currency) {
      case 'JPY':
        return 'currency-yen-circle';
      case 'USD':
        return 'currency-dollar-circle';
    }
  })();

  // Format the amount depending of the currency
  const formatCurrency = (() => {
    const options = { useGrouping: true };

    switch (contractVal.currency) {
      case 'JPY':
        return new Intl.NumberFormat('ja-JP', { ...options, maximumFractionDigits: 0 }) // Japanese Yen typically doesn't use decimal places
          .format(contractVal.assignment_total);
      case 'USD':
        return new Intl.NumberFormat('en-US', { ...options, maximumFractionDigits: 2 }).format(
          contractVal.assignment_total,
        );
      default:
        return contractVal.assignment_total.toString(); // Ensure the default case returns a string for consistency
    }
  })();

  const BadgeData = () => {
    switch (contractVal.contractStatus) {
      case 'Offer received':
        return {
          theme: 'warning',
          icon: <Dot size="small" color={variables.color_warning_600} shadow={false} />,
        };
      case 'Offer sent':
        return {
          theme: 'secondary',
          icon: <Icon fontSize={12} name="arrow-up" className="text-Gray-light-mode-600" />,
        };
      case 'Awaiting confirmation':
        return {
          theme: 'warning',
          icon: <Icon fontSize={12} name="clock" className="text-Warning-600" />,
        };
      case 'Payment required':
        return {
          theme: 'warning',
          icon: <Icon fontSize={12} name="alert-circle" className="text-Warning-600" />,
        };
      case 'Ongoing':
        return {
          theme: 'success',
          icon: <Dot size="small" color={variables.color_success_700} shadow={false} />,
        };
      case 'Completed':
        return {
          theme: 'success',
          icon: <Icon name="check-circle" fontSize={12} className="text-Success-600" />,
        };
      case 'Canceled':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Kicked out':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Closed':
        return {
          theme: 'secondary',
          icon: <></>,
        };
      case 'Withdrawn':
        return {
          theme: 'secondary',
          icon: <></>,
        };
    }
  };

  const handleOpenOverlayModal = async () => {
    dispatch(setSelected(contract.id));
    setOpenOverlay(true);
  };

  const badge = BadgeData();

  return {
    badge,
    type,
    name,
    profileImageUrl,
    currencyIconName,
    formatCurrency,
    contractVal,
    handleOpenOverlayModal,
  };
};
