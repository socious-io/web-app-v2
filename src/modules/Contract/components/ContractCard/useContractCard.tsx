import { useDispatch } from 'react-redux';
import { Contract } from 'src/core/adaptors';
import { getIdentityMeta } from 'src/core/utils';
import { handleDisplaySlider, setSelected } from 'src/store/reducers/contracts.reducer';

export const useContractCard = (contract: Contract) => {
  const dispatch = useDispatch();
  const { name: partnerName, profileImage: partnerProfileImage, type: partnerType } = getIdentityMeta(contract.partner);

  const handleOpenOverlayModal = async () => {
    dispatch(setSelected(contract.id));
    dispatch(handleDisplaySlider(true));
  };

  return {
    data: {
      partnerName,
      partnerProfileImage,
      partnerType,
    },
    operations: {
      handleOpenOverlayModal,
    },
  };
};
