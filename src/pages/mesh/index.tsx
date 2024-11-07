import { MeshWallet } from '@meshsdk/core';
export function PageMesh() {
  function newWallet() {
    const mnemonic = MeshWallet.brew();
    console.log('mnemonic', mnemonic);
  }
  return (
    <>
      <h1>mesh demo</h1>
      <button onClick={() => newWallet()}>new wallet</button>
    </>
  );
}
