// Import the API
import { ApiPromise, WsProvider } from '@polkadot/api';

let network = process.argv[2];

const wsProvider = new WsProvider('wss://rpc.polkadot.io');

async function main () {
  // Create connection to websocket
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
  // Create a new instance of the api
  const api = await ApiPromise.create({ provider: wsProvider });
  // get the chain information
  const chainInfo = await api.registry.getChainProperties()

  console.log(chainInfo);
  // for Polkadot this would print
  // {ss58Format: 0, tokenDecimals: [10], tokenSymbol: [DOT]}
}

main().catch(console.error).finally(() => process.exit());;
