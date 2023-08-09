import {
  JsonRpcPayload,
  JsonRpcResponse
} from 'web3-core-helpers';
import TronWeb from 'tronweb';
import { Chain } from 'wagmi/chains';
import { Connector, Address, ConnectorData } from 'wagmi';



class TronLinkProvider {
  public tronWeb: typeof TronWeb;

  constructor(tronWeb: typeof TronWeb) {
      this.tronWeb = tronWeb;
  }

  sendAsync(payload: JsonRpcPayload, callback: (error: Error | null, result?: JsonRpcResponse) => void): void {
      // Translate the payload.method from web3/ETH format to Tron format if needed
      // For simplicity, we're using trx as an example here; you'd need more logic for full compatibility

      const method = this.tronWeb.trx[payload.method as keyof typeof this.tronWeb.trx];

      if (!method) {
          callback(new Error(`No method matched for ${payload.method}`));
          return;
      }

      method(...payload.params)
          .then((result: any) => callback(null, {id: payload.id, jsonrpc: payload.jsonrpc, result}))
          .catch((error: Error) => callback(error));
  }
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
      account: provider.tronWeb.defaultAddress.hex,
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
    return  provider.tronWeb.defaultAddress.hex;
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
    return new TronLinkProvider(tronWeb);
  }

  async disconnect() {}

  async getSigner(config?: { chainId?: number }): Promise<any> {
    return '';
  }

  async isAuthorized(): Promise<boolean> {
    return true;
  }
}
