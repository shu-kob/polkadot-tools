// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

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

  const [nodeVersion] = await Promise.all([
    api.rpc.system.version(),
  ]); 
  console.log(`nodeVersion: ${nodeVersion}`);

  const [runtimeVersion] = await Promise.all([
    api.rpc.state.getRuntimeVersion()
  ]);

  console.log(`specVersion: ${runtimeVersion.specVersion}`);
  console.log(`transactionVersion: ${runtimeVersion.transactionVersion}`);

  const [currentBlockInfo] = await Promise.all([
    api.rpc.chain.getHeader(currentBlockHash),
  ]);

  console.log(`currentBlock: ${currentBlockInfo}`);

  const [finalizedHead] = await Promise.all([
    api.rpc.chain.getFinalizedHead()
  ]);

  console.log(`finalizedHead: ${finalizedHead}`);

  const [finalizedHeadBlock] = await Promise.all([
    api.rpc.chain.getHeader(finalizedHead)
  ]);

  console.log(`finalizedHeadBlock: ${finalizedHeadBlock}`);
}

main().catch(console.error).finally(() => process.exit());
