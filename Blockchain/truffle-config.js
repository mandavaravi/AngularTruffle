require("dotenv").config();
const HDWalletProvider = require("truffle-hdwallet-provider");

var mnemonic = process.env.MNENOMIC;

module.exports = {
  networks: {
    // development: {
    //   host: "127.0.0.1",
    //   port: 7545,
    //   network_id: "*"
    // },
    goerli: {
      provider: () => new HDWalletProvider(MNEMONIC, 'https://goerli.infura.io/v3/13210507435f43eba580f6f9d7ae9d5b'),
      network_id: 5,
      gas:4465030,       // Goerli's id
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    }
    // rinkeby: {
    //   provider: () =>
    //     new HDWalletProvider(mnemonic, process.env.YOUR_RINKEBY_TEST_URL
    //       ),
    //   network_id: "4",
    //   skipDryRun: true
    // }
  },
  compilers: {
    solc: {
      version: '0.8.7',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
