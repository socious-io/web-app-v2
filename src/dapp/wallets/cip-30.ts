import { bsc } from 'viem/chains';

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
  private provider: CIP30Provider;
  private listeners: { [event: string]: Array<(...args: any[]) => void> };
  private enabled: any;

  constructor(provider: CIP30Provider) {
    this.provider = provider;
    this.listeners = {};
  }

  /**
   * EIP-1193 request method
   * Maps CIP-30 methods to EIP-1193 equivalent functionality.
   */
  async request({ method, params }: EIP1193RequestParams): Promise<any> {
    switch (method) {
      case 'eth_requestAccounts':
        this.enabled = await this.provider.enable();
        return this.getAccount();
      case 'eth_accounts':
        this.enabled = await this.provider.enable();
        return this.enabled.getAccounts(); // Get accounts
      case 'eth_chainId':
        return this.enabled.getNetworkId();
      case 'wallet_requestPermissions':
        return [];
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  }

  async getAccount() {
    let addresses = await this.enabled.getUsedAddresses();
    if (addresses.length < 1) addresses = await this.enabled.getUnusedAddresses();
    // TODO: need to parse hex addresses
    return addresses;
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
