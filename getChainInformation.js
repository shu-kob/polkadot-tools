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
  // Create a new instance of the api
  const api = await ApiPromise.create({ provider: wsProvider });
  // get the chain information
  const chainInfo = await api.registry.getChainProperties()

  console.log(chainInfo);
  // for Polkadot this would print
  // {ss58Format: 0, tokenDecimals: [10], tokenSymbol: [DOT]}
}

main().catch(console.error).finally(() => process.exit());;
