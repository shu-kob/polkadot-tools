// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');

  const api = await ApiPromise.create({ provider: wsProvider });

  // estimate the fees as RuntimeDispatchInfo, using the signer (either
  // address or locked/unlocked keypair) (When overrides are applied, e.g
  //  nonce, the format would be `paymentInfo(sender, { nonce })`)
  const info = await api.tx.balances
    .transfer("16bCbKUC3J9GhjWND11WeCimQ4UiesJo9ePBqAY2FDubW8NW", 1)
    .paymentInfo("15fiSWdqfq4M1mkeZVVnvuQqzHDVcYjtjFtTfSdPvZDeYhcM");
  // log relevant info, partialFee is Balance, estimated for current
  console.log(`
  class=${info.class.toString()},
  weight=${info.weight.toString()},
  partialFee=${info.partialFee.toHuman()}
  `)
};

main().catch(console.error).finally(() => process.exit());
