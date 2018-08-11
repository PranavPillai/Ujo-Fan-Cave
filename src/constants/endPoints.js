
let HOSTNAME = window && window.location && window.location.hostname;
let API = '/api';
let IMAGE_PROXY = '/image';
const subdomain = window.location.host.indexOf('dev') > -1 ? 'dev.' : '';

const INFURA_ACCESS_KEY = 'UJO2018x'; // not an access key per se, but a reference.

export const MAINNET_WEB3 = 'https://mainnet.infura.io';
export const RINKEBY_WEB3 = 'https://rinkeby.infura.io';

let WEB3_API = MAINNET_WEB3;
let EXPECTED_INJECTED_WEB3_NETWORK = '1';

if (subdomain === 'dev.') {
  WEB3_API = RINKEBY_WEB3;
  EXPECTED_INJECTED_WEB3_NETWORK = '4';
}

// TODO: add back for dev version of proxy server
let ethScan = 'https://etherscan.io';

if (process.env.REACT_APP_ENV === 'local') { // local serves local go server
  API = 'http://localhost:9001/api';
  IMAGE_PROXY = 'https://www.dev.ujomusic.com/image';
  // TODO: add back for dev version of proxy server
  // subdomain = 'dev.';
  ethScan = 'https://rinkeby.etherscan.io';
  // if on local, web3 points to rinkeby.
  // dev & production points to mainnet contracts.
  WEB3_API = RINKEBY_WEB3;
  EXPECTED_INJECTED_WEB3_NETWORK = '4';
  HOSTNAME = 'www.ujomusic.com';
}

export const API_ENDPOINT = 'http://localhost:9001/api';
export const IMAGE_PROXY_ENDPOINT = IMAGE_PROXY;
// TODO: add back for dev version of proxy server
export const AUDIO_PROXY_ENDPOINT = `https://${HOSTNAME}/v2/audio/mp3/`;
// export const AUDIO_PROXY_ENDPOINT = `https://${subdomain}ujomusic.com/v2/audio/mp3/`;
export const IPFS_API_ENDPOINT = 'https://ipfs.infura.io:5001/api/v0';
export const ETHERSCAN_ENDPOINT = ethScan;
export const WEB3_ENDPOINT = `${WEB3_API}/${INFURA_ACCESS_KEY}`;
export const EXPECTED_INJECTED_WEB3_NETWORK_NUMBER = EXPECTED_INJECTED_WEB3_NETWORK;
