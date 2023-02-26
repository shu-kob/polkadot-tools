// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

// Our address for Alice on the dev chain
const ALICE = '5D7BtZu8HmTiCsMzkwH7EjFqphJEq4Lk6AHpighPVuABRhxG';

let network = process.argv[2];

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

async function main () {

  if (network == 'kusama'){
    const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
  } else if (network == 'westend'){
    const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
  } else if (network == 'rococo'){
    const wsProvider = new WsProvider('wss://rococo-rpc.polkadot.io');
  } else if (network == 'astar'){
    const wsProvider = new WsProvider('wss://rpc.astar.network');
  } else if (network == 'shibuya'){
    const wsProvider = new WsProvider('wss://rpc.shibuya.astar.network');
  } else {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  }

  // Create our API with a default connection to the local node
  const api = await ApiPromise.create({ provider: wsProvider });

  // Make our basic chain state/storage queries, all in one go
  const [{ nonce: accountNonce }, { data: balance }, now ] = await Promise.all([
    api.query.system.account(ALICE),
    api.query.system.account(ALICE),
    api.query.timestamp.now(),
  ]);

  let dateTime = new Date(now.toNumber());
  console.log(`accountNonce(${ALICE}) ${accountNonce}`);
  console.log(`accountBalance(${ALICE}) ${balance.free}`);
  console.log(`last block timestamp ${dateTime.toString()}`);

}

main().catch(console.error).finally(() => process.exit());
