import { ChangeEvent, useState } from 'react';
import { Button } from '../../../components/atoms/button/button';
import { Input } from '../../../components/atoms/input/input';
import Config from '../crypto-config';
import Web3 from 'web3';
import css from './mobile.module.scss';

export const Mobile = (): JSX.Element => {
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState('');
  const [contributor, setContributor] = useState('');
  const [process, setProcess] = useState(false);

  const web3 = new Web3(window.ethereum)
  web3.eth.getAccounts().then(accounts => {
    setAccount(accounts[0])
    web3.eth.defaultAccount = accounts[0]
  })

  function onAmountChange(e: ChangeEvent<HTMLInputElement>) {
    setAmount(e.target.value);
  }

  function onContributorChange(e: ChangeEvent<HTMLInputElement>) {
    setContributor(e.target.value);
  }

  async function connectWallet() {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts()
    setAccount(accounts[0])
    web3.eth.defaultAccount = accounts[0]
  }

  async function allowance(escrowAmount: number) {
    // we may configure this fee ratio later
    const fee = escrowAmount * 0.03
    const allowanceAmount = escrowAmount + fee
    const erc20Contract = new web3.eth.Contract(Config.token.abi, Config.token.address)
    
    const approved = await erc20Contract.methods.approve(Config.escrow.address, web3.utils.toWei(allowanceAmount.toString()))
        .send({from: web3.eth.defaultAccount})
    if (!approved) throw new Error('Allowance not approved for escorw')
  }

  async function escorw(escrowAmount: number) {
    const verifiedORG = false

    const escrowContract = new web3.eth.Contract(Config.escrow.abi, Config.escrow.address)
    const result = await escrowContract.methods.newEscrow(contributor, 'TEST_JOB_ID', web3.utils.toWei(escrowAmount.toString()), verifiedORG, Config.token.address)
        .send({from: web3.eth.defaultAccount})
    
    // Need to share <txHash> to backend on Payment API to verify and create Escrow on BE side too
    const txHash = result.transactionHash
    return {
      // Escrow Action will trigger right after success Escrow
      ...result.events.EscrowAction.returnValues,
      txHash
    }
  }

  async function backendSyncSample(body: any) {
    // POST /api/v2/payments/offers/:id
    // TODO: This body must sync with Backend
    console.log(body)
  }

  async function proceedPayment() {
    setProcess(true)
    const escrowAmount = parseInt(amount)
    // First need allowance to verify that transaction is possible for smart contract
    try {
      await allowance(escrowAmount)
    } catch(e) {
      alert(JSON.stringify(e))
    }

    // put escro on smart contract
    try {
      const result = await escorw(escrowAmount)
      
      // this is paramater need to sync with backend to make Hire available
      await backendSyncSample({
        service: 'CRYPTO',
        source: account,
        txHash: result.txHash,
        meta: result
      })

    } catch(e) {
      alert(JSON.stringify(e))
    }
    setProcess(false)
  }

  if (!window.ethereum) return (
    <div className={css.container}>
      <div>Could not find Metamask</div>
    </div>    
  )

  if (window.ethereum.chainId !== Config.networkId) return (
    <div className={css.container}>
      <div>Please switch to Milkmeda network</div>
    </div>
  )

  if (!account) return (
    <div className={css.container}>
      <Button onClick={connectWallet}>Connect wallet</Button>
    </div>
  )
  
  return (
    <div className={css.container}>
      <Input value={account} disabled label="Account wallet address" />
      <Input value={contributor} onChange={onContributorChange} label="Contributor wallet address" />
      <Input value={amount} onChange={onAmountChange} label="amount" />
      <Button onClick={proceedPayment} disabled={process}>Proceed with Payment</Button>
    </div>
  );
};
