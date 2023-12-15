import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ProjectPaymentSchemeType, ProjectPaymentType, offerByApplicant } from 'src/core/api';
import Dapp from 'src/dapp';
import { useChainId } from 'wagmi';
import * as yup from 'yup';
type Inputs = {
  title: string;
  paymentType: ProjectPaymentType;
  paymentTerm: ProjectPaymentSchemeType;
  hours: number;
  // description: string;
};
const schema = yup.object().shape({
  title: yup.string().min(2, 'Must be 2-50 characters').max(50, 'Must be 2-50 characters'),
  paymentType: yup.string().required(),
  paymentTerm: yup.string().required(),
  hours: yup.number(),
  // description: yup.string().required(),
});
export const useOrgOffer = () => {
  const { web3 } = Dapp.useWeb3();
  const chainId = useChainId();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    console.log('mapTokens');

    const getTokens = async () => {
      if (web3) {
        const selectedNetwork = Dapp.NETWORKS.filter((n) => n.chain.id === chainId)[0];
        const mapTokens = selectedNetwork.tokens.map((token) => {
          return {
            value: token.address,
            title: token.name,
            subtitle: token.symbol,
          };
        });
        console.log('mapTokens333', selectedNetwork);
        // setTokens(mapTokens);
        // const { rate } = await findTokenRate(mapTokens[0].value);
        // setTokenRate(rate);
      }
    };
    getTokens();
  }, [web3, chainId]);
  const onSelectPaymentType = (paymentType: ProjectPaymentType) => {
    setValue('paymentType', paymentType);
  };
  const onSelectPaymentTerm = (paymentType: ProjectPaymentSchemeType) => {
    setValue('paymentTerm', paymentType);
  };
  const onSubmit: SubmitHandler<Inputs> = async (props) => {
    console.log(props);
  };
  return { register, handleSubmit, errors, onSubmit, setValue, onSelectPaymentType, onSelectPaymentTerm };
};
