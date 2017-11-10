var accounts;
var account;
var foodSafeABI;
var foodSafeContract;
var foodSafeCode;
App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    return App.initWeb3 ();
  },

  initWeb3: function () {
    // Initialize web3 and set the provider to the testRPC.
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      web3 = new Web3 (web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new web3.providers.HttpProvider (
        'http://localhost:8545'
      );
      web3 = new Web3 (App.web3Provider);
    }
    web3.eth.getAccounts (function (error, accounts) {
      if (error) {
        console.log (error);
      }

      account = accounts[0];
      web3.eth.defaultAccount = account;

      var foodSafeSource =
        'pragma solidity ^0.4.6; contract FoodSafe {    struct Location{        string Name;        uint LocationId;        uint PreviousLocationId;        uint Timestamp;        string Secret;    }        mapping(uint => Location) Trail;    uint8 TrailCount=0;    function AddNewLocation(uint LocationId, string Name, string Secret)   {        Location memory newLocation;        newLocation.Name = Name;        newLocation.LocationId= LocationId;        newLocation.Secret= Secret;        newLocation.Timestamp = now;        if(TrailCount!=0)        {            newLocation.PreviousLocationId= Trail[TrailCount].LocationId;        }        Trail[TrailCount] = newLocation;        TrailCount++;    }    function GetTrailCount() returns(uint8){        return TrailCount;    }    function GetLocation(uint8 TrailNo) returns (string,uint,uint,uint,string)    {        return (Trail[TrailNo].Name, Trail[TrailNo].LocationId, Trail[TrailNo].PreviousLocationId, Trail[TrailNo].Timestamp,Trail[TrailNo].Secret);    }}';
      web3.eth.compile.solidity (foodSafeSource, function (
        error,
        foodSafeCompiled
      ) {
        console.log (error);
        console.log (foodSafeCompiled);
        foodSafeABI = foodSafeCompiled['<stdin>:FoodSafe'].info.abiDefinition;
        foodSafeContract = web3.eth.contract (foodSafeABI);
        foodSafeCode = foodSafeCompiled['<stdin>:FoodSafe'].code;
        //console.log (foodSafeCode);
      });
    });
  },
  createContract: function () {
    foodSafeContract.new (
      '',
      {from: account, data: foodSafeCode, gas: 3000000},
      function (error, deployedContract) {
        if (deployedContract.address) {
          document.getElementById ('contractAddress').value =
            deployedContract.address;
        }
      }
    );
  },
};
$ (function () {
  $ (window).load (function () {
    App.init ();
  });
});
