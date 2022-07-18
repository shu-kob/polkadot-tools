// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

// Our address for Alice on the dev chain
const ALICE = '5D7BtZu8HmTiCsMzkwH7EjFqphJEq4Lk6AHpighPVuABRhxG';

async function main () {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
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
