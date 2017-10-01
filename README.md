# Geagora
Geagora is an Ethereum based market place for matching carbon sequestration sellers with buyers
## Install
- ` testrpc `
- ` truffle migrate `
- ` npm run dev `

## Verify it is working
### Get retired NECs
 `Adoption.deployed().then((instance)=>{return instance.getAdopters.call()});` 
