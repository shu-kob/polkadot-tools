// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

// Our address for Alice on the dev chain
const ALICE = '5D7BtZu8HmTiCsMzkwH7EjFqphJEq4Lk6AHpighPVuABRhxG';

let network = process.argv[2];

let endpoint = '';

async function main () {

  if (network == 'kusama'){
    endpoint = 'wss://kusama-rpc.polkadot.io';
  } else if (network == 'westend'){
    endpoint = 'wss://westend-rpc.polkadot.io';
  } else if (network == 'rococo'){
    endpoint = 'wss://rococo-rpc.polkadot.io';
  } else if (network == 'astar'){
    endpoint = 'wss://rpc.astar.network';
  } else if (network == 'shibuya'){
    endpoint = 'wss://rpc.shibuya.astar.network';
  } else {
    endpoint = 'wss://rpc.polkadot.io';
  }
  let wsProvider = new WsProvider(endpoint);

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
