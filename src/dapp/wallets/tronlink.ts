import { Chain } from 'wagmi/chains';
import { Connector, Address, ConnectorData } from 'wagmi';



class TronLinkProvider {
  constructor(tronWeb: any) {
    this.tronWeb = tronWeb;
  }

  sendAsync(payload, callback) {
    // Translate the payload.method from web3/ETH format to Tron format if needed

    // Send the request to TronLink
    this.tronWeb.trx[payload.method](...payload.params)
      .then(result => callback(null, {result}))
      .catch(error => callback(error));
  }

  // You might also need other functions like 'send' depending on your Web3.js version
}



export default class extends Connector {
  id = 'tronlink';
  name = 'TonLink Wallet';
  options = {};
  ready = false;

  // Event emitters
  onAccountsChanged = (_: string[]): void => {}; // empty function
  onChainChanged = (_: number): void => {}; // empty function
  onDisconnect = (): void => {}; // empty function
  getBlockExplorerUrls = (_: Chain): string[] | undefined => undefined;
  isChainUnsupported = (_: number): boolean => true;

  async connect(config?: { chainId?: number }): Promise<Required<ConnectorData<any>>> {


    const provider = await this.getProvider();

    if (!provider) throw Error('Please Unlock or Enable your wallet')


    const chainId = config?.chainId || this.chains[0].id;
    if (chainId) await this.switchChain(chainId);

    return {
      provider,
      chain: {
        id: chainId,
        unsupported: false,
      },
      account: provider.defaultAddress.hex,
    };
  }

  async switchChain(chainId: number): Promise<Chain> {
    /* const provider = await this.getProvider()
      await provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainId }],
      }); */
    return this.chains.filter((c) => c.id == chainId)[0];
  }

  async getAccount(): Promise<Address> {
    const provider = await this.getProvider();
    const accounts = provider.enable();
    return accounts[0];
  }
  async getChainId(): Promise<number> {
    const { chain } = await this.connect();
    return chain.id;
  }

  async getProvider() {
    let tronWeb
    if (window.tronLink.ready) {
         tronWeb = window.tronLink.tronWeb;
    } else {
        const res = await window.tronLink.request({ method: 'tron_requestAccounts' });
        if (res.code === 200) {
          tronWeb = window.tronLink.tronWeb;
        }
    }
    return tronWeb;
  }

  async disconnect() {}

  async getSigner(config?: { chainId?: number }): Promise<any> {
    return '';
  }

  async isAuthorized(): Promise<boolean> {
    return true;
  }
}
