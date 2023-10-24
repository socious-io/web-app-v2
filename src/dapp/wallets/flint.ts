import { Connector, Address, ConnectorData } from 'wagmi';
import { Chain } from 'wagmi/chains';

export default class extends Connector {
  id = 'flint';
  name = 'Flint Wallet';
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
    const accounts = await provider.enable();
    const chainId = config?.chainId || this.chains[0].id;
    if (chainId) await this.switchChain(chainId);

    return {
      provider,
      chain: {
        id: chainId,
        unsupported: false,
      },
      account: accounts[0],
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
    const provider = window?.evmproviders?.flint;
    if (!provider?.isFlint) {
      window.open(`https://flint-wallet.app.link/browse?dappUrl=${window.global.location.href}`, '_blank');
      throw new Error('Flint provider could not be found');
    }
    await provider.request({ method: 'eth_requestAccounts' });
    return provider;
  }

  async disconnect() {}

  async getSigner(config?: { chainId?: number }): Promise<any> {
    return '';
  }

  async isAuthorized(): Promise<boolean> {
    return true;
  }
}
