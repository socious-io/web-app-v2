import Web3 from "web3";

window.ethereum = {
    enable: jest.fn(),
};

let web3Mock: any;
const mockAccounts = ['0x1234567890123456789012345678901234567890'];

describe('getAccounts', () => {
    if(window.ethereum) {
        web3Mock = new Web3(window.ethereum);
        web3Mock = {
            eth: {
                getAccounts: jest.fn().mockResolvedValue(mockAccounts)
            }
        }
    }

    it('should get accounts from Web3', async () => {
        await window.ethereum.enable();
        const accounts = await web3Mock.eth.getAccounts();
        expect(accounts).toEqual(mockAccounts);
        web3Mock.eth.defaultAccount = accounts[0];
    });
});