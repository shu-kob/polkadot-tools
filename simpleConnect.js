// Import the API
const { ApiPromise, WsProvider } = require('@polkadot/api');

async function main () {
  const wsProvider = new WsProvider('wss://rpc.polkadot.io');

  const api = await ApiPromise.create({ provider: wsProvider });

  // Make our basic chain state/storage queries, all in one go
  const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);

  console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

}

main().catch(console.error).finally(() => process.exit());
