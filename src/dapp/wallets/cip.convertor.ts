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
    if (!provider) {
      throw new Error('Lace provider is required');
    }
    this.provider = provider;
    this.listeners = {};
  }

  /**
   * EIP-1193 request method
   * Maps CIP-30 methods to EIP-1193 equivalent functionality.
   */
  async request({ method, params }: EIP1193RequestParams): Promise<any> {
    const res = await this.monitor({ method, params });
    console.log(method, '-->', res, '******************@@@@@@@');
    return res;
  }

  /**
   * EIP-1193 request method
   * Maps CIP-30 methods to EIP-1193 equivalent functionality.
   */
  async monitor({ method, params }: EIP1193RequestParams): Promise<any> {
    switch (method) {
      case 'eth_requestAccounts':
        return this.enabled.enable(); // Enable Lace wallet
      case 'eth_accounts':
        this.enabled = await this.provider.enable();
        return this.enabled.getAccounts(); // Get accounts
      case 'eth_chainId':
        return this.enabled.getNetworkId();
      default:
        console.log(`Unsupported method: ${method}***************************`);
    }
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
    console.log(this.provider, '-------------------------------@@@', this.enabled);
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
