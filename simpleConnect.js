// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  // const wsProvider = new WsProvider('wss://rpc.polkadot.io');
  const wsProvider = new WsProvider('wss://polkadot-dot-ws.bbc2.io');
  const api = await ApiPromise.create({ provider: wsProvider });

  // Make our basic chain state/storage queries, all in one go
  const [chain, nodeName, nodeVersion, syncState, name, health, properties, getFinalizedHead, currentEpoch, queryInfo] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.system.syncState(),
    api.rpc.system.name(),
    api.rpc.system.health(),
    api.rpc.system.properties(),
    api.rpc.chain.getFinalizedHead(),
    api.rpc.payment.queryInfo("0x280403000b8a26ee148201" ,"0x045bd0c25d074fee694135837642dcee1a8f6a52b77d0da8612a751ccdf40a58"),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
  console.log(`syncState: ${syncState}`);
  console.log(`name: ${name}`);
  console.log(`health: ${health}`);
  console.log(`properties: ${properties}`);
  console.log(`getFinalizedHead: ${getFinalizedHead}`);
  console.log(`queryInfo: ${queryInfo}`);
  console.log(`currentEpoch: ${currentEpoch}`);
}

main().catch(console.error).finally(() => process.exit());
