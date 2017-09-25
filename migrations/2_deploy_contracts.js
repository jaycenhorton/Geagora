var Adoption = artifacts.require("./Adoption.sol");
var TonToken = artifacts.require("./TonToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Adoption);
  deployer.deploy(TonToken);
};