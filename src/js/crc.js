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
    return App.initContract ();
  },

  initContract: function () {
    $.getJSON ('Crc.json', function (data) {
      const CrcArtifact = data;
      App.contracts.Crc = TruffleContract (CrcArtifact);

      // Set the provider for our contract.
      App.contracts.Crc.setProvider (App.web3Provider);
    });
    return App.bindEvents ();
  },

  bindEvents: function () {
    //$ (document).on ('click', '#transferButton', App.handleTransfer);
  },

  createContract: () => {
    web3.eth.getAccounts (function (error, accounts) {
      if (error) {
        console.log (error);
      }

      var account = accounts[0];
      $.getJSON ('Crc.json', function (data) {
        const CrcArtifact = data;
        App.contracts.Crc = TruffleContract (CrcArtifact);
        App.contracts.Crc.setProvider (App.web3Provider);
        return data;
      })
        .then (data => {
          return App.contracts.Crc.new (
            '',
            {from: account, data: data.unlinked_binary, gas: 3000000}
            // ,(err, deployed) => {
            //   console.log ('Error deploying contract');
            //   if (deployed.address) {
            //     document.getElementById ('contractAddress').value =
            //       deployed.address;
            //     console.log ('Success' + deployed.address);
            //   } else {
            //     console.log ('Error deploying contract');
            //   }
            // }
          );
        })
        .then (instance => {
          document.getElementById ('contractAddress').value = instance.address;
          console.log (instance);
        });
    });
    // Set the provider for our contract.
    App.contracts.Crc.setProvider (App.web3Provider);
  },

  getBalances: function (adopters, account) {
    var TonTokenInstance;

    web3.eth.getAccounts (function (error, accounts) {
      if (error) {
        console.log (error);
      }

      var account = accounts[0];

      App.contracts.TonToken
        .deployed ()
        .then (function (instance) {
          TonTokenInstance = instance;

          return TonTokenInstance.balanceOf (account);
        })
        .then (function (result) {
          balance = result.c[0];

          $ ('#TTBalance').text (balance);
        })
        .catch (function (err) {
          console.log (err.message);
        });
    });
  },
};

$ (function () {
  $ (window).load (function () {
    App.init ();
  });
});
