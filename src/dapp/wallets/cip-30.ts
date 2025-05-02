import { ethers } from 'ethers';
export interface CIP30Provider {
  enable(): Promise<string[]>;
  getNetworkId(): Promise<number>;
  getAccounts(): Promise<string[]>;
}

export type EIP1193RequestParams = {
  method: string;
  params?: unknown[];
};

export class CIP30ToEIP1193Provider {
  public isCIP30 = true;
  public name: string;
  public addresses: string[];
  private provider: CIP30Provider;
  private listeners: { [event: string]: Array<(...args: any[]) => void> };
  private enabled: any;
  private tmpChainId: number;

  constructor(provider: CIP30Provider, name: string, tmpChainId: number) {
    this.provider = provider;
    this.listeners = {};
    this.tmpChainId = tmpChainId;
    this.name = name;
    this.addresses = [];
  }

  /**
   * EIP-1193 request method
   * Maps CIP-30 methods to EIP-1193 equivalent functionality.
   */
  async request({ method, params }: EIP1193RequestParams): Promise<any> {
    this.enabled = await this.provider.enable();
    const accounts = await this.getAccounts();
    console.log(method, '-----------------');
    switch (method) {
      case 'eth_requestAccounts':
        this.emit('connect', { chainId: await this.enabled.getNetworkId() });
        this.emit('accountsChanged', accounts);
        return accounts;
      case 'eth_accounts':
        return this.getAccounts();
      case 'eth_chainId':
        return this.tmpChainId;
      case 'wallet_requestPermissions':
        return [];
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  async getCardanoAddresses(): Promise<string[]> {
    let addresses = await this.enabled.getUsedAddresses();
    if (addresses.length < 1) addresses = await this.enabled.getUnusedAddresses();
    this.addresses = addresses;
    return addresses;
  }

  async getAccounts(): Promise<string> {
    // Convert Cardano addresses to Ethereum-compatible addresses
    const ethereumAddresses = (await this.getCardanoAddresses()).map(address => {
      // Hash the Cardano address using Keccak-256
      const hash = ethers.keccak256(ethers.toUtf8Bytes(address));
      // Take the last 20 bytes (40 characters) of the hash
      const ethereumAddress = `0x${hash.slice(-40)}`;
      return ethereumAddress;
    });

    return ethereumAddresses;
  }

  /**
   * Register an event listener for EIP-1193 events.
   */
  on(event: string, listener: (...args: any[]) => void): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  async once(event: string, listener: (...args: any[]) => void): Promise<void> {
    this.enabled = await this.provider.enable();
    const onceListener = (...args: any[]) => {
      listener(...args);
      this.removeListener(event, onceListener);
    };
    this.on(event, onceListener);
  }

  /**
   * Remove a specific listener for an EIP-1193 event.
   */
  removeListener(event: string, listenerToRemove: (...args: any[]) => void): void {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(listener => listener !== listenerToRemove);
  }

  /**
   * Emit an event to all registered listeners.
   */
  emit(event: string, ...args: any[]): void {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(listener => listener(...args));
  }
}
