var Adoption = artifacts.require ('./Adoption.sol');
var TonToken = artifacts.require ('./TonToken.sol');
var Crc = artifacts.require ('./Crc.sol');
var FoodSafe = artifacts.require ('./FoodSafe.sol');

module.exports = function (deployer) {
  deployer.deploy (Adoption);
  deployer.deploy (TonToken);
  deployer.deploy (Crc);
  deployer.deploy (FoodSafe);
};
