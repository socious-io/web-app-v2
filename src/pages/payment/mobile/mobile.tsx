import { useState } from "react";
import { useMatch } from "@tanstack/react-location";
import Web3 from "web3";
import { useNavigate } from "@tanstack/react-location";
import { Header } from "src/components/atoms/header-v2/header";
import { Button } from "src/components/atoms/button/button";
import { JobDescrioptionCard } from "src/components/templates/job-description-card";
import { PaymentSummaryCard } from "src/components/templates/payment-summary-card";
import { PaymentMethods } from "src/components/templates/payment-methods";
import { Sticky } from "src/components/atoms/sticky";
import config from "../crypto-config";
import { confirmPayment } from "./mobile.service";
import { getMonthName } from "src/core/time";
//FIXME: create a general Resolver types to use in every page
import { Resolver } from "src/pages/offer-received/offer-received.types";
import css from "./mobile.module.scss";

export const Mobile = (): JSX.Element => {
  const navigate = useNavigate();
  const { offer } = useMatch().ownData as Resolver;
  const offerId = offer.id;
  const {
    job_category: { name: job_name },
    created_at,
    recipient: {
      meta: { name: applicant_name, avatar, city, country },
      type,
    },
    project: { payment_scheme },
    total_hours,
    assignment_total,
  } = offer;
  //FIXME: if no contribute not allow to continue flow
  const contributor = offer.recipient.meta.wallet_address;
  const commision = assignment_total * 0.03;
  const total_price = commision + assignment_total;
  const start_date =
    getMonthName(created_at) + " " + new Date(created_at).getDate();
  const amount = "2";
  const [account, setAccount] = useState("");
  const [process, setProcess] = useState(false);

  const web3 = new Web3(window.ethereum);
  web3.eth.getAccounts().then((accounts) => {
    setAccount(accounts[0]);
    web3.eth.defaultAccount = accounts[0];
  });

  async function connectWallet() {
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    web3.eth.defaultAccount = accounts[0];
  }

  async function allowance(escrowAmount: number) {
    // we may configure this fee ratio later
    const fee = escrowAmount * 0.03;
    const allowanceAmount = escrowAmount + fee;
    const erc20Contract = new web3.eth.Contract(
      config.token.abi,
      config.token.address
    );

    const approved = await erc20Contract.methods
      .approve(
        config.escrow.address,
        web3.utils.toWei(allowanceAmount.toString())
      )
      .send({ from: web3.eth.defaultAccount });
    if (!approved) throw new Error("Allowance not approved for escorw");
  }

  async function escorw(escrowAmount: number) {
    const verifiedORG = false;

    const escrowContract = new web3.eth.Contract(
      config.escrow.abi,
      config.escrow.address
    );
    const result = await escrowContract.methods
      .newEscrow(
        contributor,
        "TEST_JOB_ID",
        web3.utils.toWei(escrowAmount.toString()),
        verifiedORG,
        config.token.address
      )
      .send({ from: web3.eth.defaultAccount });

    // Need to share <txHash> to backend on Payment API to verify and create Escrow on BE side too
    const txHash = result.transactionHash;
    return {
      // Escrow Action will trigger right after success Escrow
      ...result.events.EscrowAction.returnValues,
      txHash,
    };
  }

  async function proceedPayment() {
    setProcess(true);
    const escrowAmount = parseInt(amount);
    // First need allowance to verify that transaction is possible for smart contract
    await allowance(escrowAmount);

    // put escro on smart contract
    const result = await escorw(escrowAmount);
    try {
      // this is paramater need to sync with backend to make Hire available
      await confirmPayment(offerId, {
        service: "CRYPTO",
        source: account,
        txHash: result.txHash,
        meta: result,
      });
      navigate({ to: "/hire" });
    } catch (e) {
      alert(JSON.stringify(e));
    }
    setProcess(false);
  }

  if (!window.ethereum) {
    return (
      <div className={css.container}>
        <div>Could not find Metamask</div>
      </div>
    );
  } else if (window.ethereum.chainId !== config.networkId) {
    return (
      <div className={css.container}>
        <div>Please switch to Milkmeda network</div>
      </div>
    );
  }
  return (
    <div>
      <Header
        title="Escrow payment"
        onBack={() => navigate({ to: "/offer-received" })}
      />
      <div className={css["container"]}>
        <JobDescrioptionCard
          job_title={job_name}
          start_date={start_date}
          end_date="Present"
          info_list={[
            { icon: "suitcase", name: payment_scheme },
            { icon: "hourglass", name: `${total_hours} hrs` },
          ]}
          img={avatar as string}
          type={type}
          name={applicant_name}
          location={`${city}, ${country}`}
        />
        <div className={css["container__spacer"]}>
          <PaymentSummaryCard
            title="Payment summary"
            list={[
              { title: "Total assignement", price: assignment_total },
              { title: " Socious commision", price: commision },
            ]}
            total_price={total_price}
          />
        </div>
        <PaymentMethods
          payement_methods={[
            {
              button: {
                color: "white",
                onClick: () => connectWallet(),
                children: (
                  <>
                    <img src="/icons/metamask.svg" width={18} height={18} />
                    Connect MetaMask
                  </>
                ),
              },
              connected_address: account,
            },
            {
              button: {
                color: "white",
                disabled: true,
                children: (
                  <>
                    <img src="/icons/debit.svg" width={18} height={18} />
                    Add Credit Card
                  </>
                ),
              },
            },
          ]}
        />
      </div>

      <Sticky>
        <Button
          color="blue"
          disabled={process || !account}
          className={css["footer__btn"]}
          onClick={() => proceedPayment()}
        >
          Proceed with payment
        </Button>
        <Button
          color="white"
          className={`${css["footer__btn"]} ${css["footer__btn--cancel"]}`}
          onClick={() => console.log("cancel")}
        >
          Cancel
        </Button>
      </Sticky>
    </div>
  );
};
