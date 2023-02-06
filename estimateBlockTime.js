// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  // const wsProvider = new WsProvider('wss://westend-rpc.polkadot.io');
  // const wsProvider = new WsProvider('wss://kusama-rpc.polkadot.io');
  // const wsProvider = new WsProvider('wss://rococo-rpc.polkadot.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Make our basic chain state/storage queries, all in one go
  const [syncState] = await Promise.all([
    api.rpc.system.syncState(),
  ]);

  console.log(`currentBlockNumber: ${syncState.currentBlock}`);

  const [currentBlockHash] = await Promise.all([
    api.rpc.chain.getBlockHash(syncState.currentBlock),
  ]);

  console.log(`currentBlockHash: ${currentBlockHash}`);

  const [runtimeVersion] = await Promise.all([
    api.rpc.state.getRuntimeVersion()
  ]);

  console.log(`currentRuntimeVersion: ${runtimeVersion}`);

  const [currentBlockInfo] = await Promise.all([
    api.rpc.chain.getHeader(currentBlockHash),
  ]);

  console.log(`currentBlock: ${currentBlockInfo}`);

}

main().catch(console.error).finally(() => process.exit());
