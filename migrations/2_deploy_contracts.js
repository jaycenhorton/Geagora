var Adoption = artifacts.require ('./Adoption.sol');
var TonToken = artifacts.require ('./TonToken.sol');
var Crc = artifacts.require ('./Crc.sol');

module.exports = function (deployer) {
  deployer.deploy (Adoption);
  deployer.deploy (TonToken);
  deployer.deploy (Crc);
};
