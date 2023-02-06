// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

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

  console.log(`currentspecVersion: ${runtimeVersion.specVersion}`);

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

  const [methods] = await Promise.all([
    api.rpc.rpc.methods()
  ]);

  console.log(`methods: ${methods}`);

}

main().catch(console.error).finally(() => process.exit());
