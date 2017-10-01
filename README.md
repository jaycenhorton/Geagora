# Geagora
Geagora is an Ethereum based market place for matching carbon sequestration sellers with buyers
## Pre-reqs
- NPM
- NodeJS
- Truffle
- EthereumJS-testRPC
## Install
- Install testrpc

`npm install -g ethereumjs-testrpc`

- Install Truffle (truffleframework.com)

`npm install -g truffle`

## Setup
Start the RPC to begin interacting with local blockchain 

- `testrpc`

Compile and migrate contracts

- ` truffle compile && truffle migrate `

Start web dapp

- ` npm run dev `

## Verify it is working
### Get retired NECs
- `truffle console`
- `Adoption.deployed().then((instance)=>{return instance.getAdopters.call()});` 
## Testing
Test contracts

- `truffle test`
