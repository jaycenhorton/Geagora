App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Load crcs.
    $.getJSON ('../crcs.json', function (data) {
      var crcsRow = $ ('#crcsRow');
      var crcTemplate = $ ('#crcTemplate');

      for (i = 0; i < data.length; i++) {
        crcTemplate.find ('.panel-title').text (data[i].provider);
        crcTemplate.find ('img').attr ('src', data[i].picture);
        crcTemplate.find ('.crc-type').text (data[i].type);
        crcTemplate.find ('.crc-tons').text (data[i].tons);
        crcTemplate.find ('.crc-location').text (data[i].location);
        crcTemplate.find ('.btn-adopt').attr ('data-id', data[i].id);

        crcsRow.append (crcTemplate.html ());
      }
    });

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
    $.getJSON ('Adoption.json', function (data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract.
      var AdoptionArtifact = data;
      App.contracts.Adoption = TruffleContract (AdoptionArtifact);

      // Set the provider for our contract.
      App.contracts.Adoption.setProvider (App.web3Provider);

      // Use our contract to retieve and mark the adopted crcs.
      return App.markAdopted ();
    });
  },

  bindEvents: function () {
    $ (document).on ('click', '.btn-adopt', App.handleAdopt);
    $ (document).on ('click', '.btn-owner-info', App.getNECOwner);
  },

  handleAdopt: function () {
    event.preventDefault ();

    var crcId = parseInt ($ (event.target).data ('id'));

    var adoptionInstance;

    web3.eth.getAccounts (function (error, accounts) {
      if (error) {
        console.log (error);
      }

      var account = accounts[0];

      App.contracts.Adoption
        .deployed ()
        .then (function (instance) {
          adoptionInstance = instance;

          return adoptionInstance.adopt (crcId, {from: account});
        })
        .then (function (result) {
          return App.markAdopted ();
        })
        .catch (function (err) {
          console.log (err.message);
        });
    });
  },

  markAdopted: function (adopters, account) {
    var adoptionInstance;

    App.contracts.Adoption
      .deployed ()
      .then (function (instance) {
        adoptionInstance = instance;

        return adoptionInstance.getAdopters.call ();
      })
      .then (function (adopters) {
        for (i = 0; i < adopters.length; i++) {
          if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
            $ ('.panel-crc')
              .eq (i)
              .find ('button')
              .text ('Retired')
              .attr ('disabled', true);
            $ ('.panel-body')
              .eq (i)
              .append (
                `<button type='button' class='btn-owner-info' data-id=${i} data-toggle='modal' data-target='#myModal'>Who bought this?</button>`
              );
          }
        }
      })
      .catch (function (err) {
        console.log (err.message);
      });
  },

  getNECOwner: () => {
    event.preventDefault ();

    var crcId = parseInt ($ (event.target).data ('id'));

    var adoptionInstance;

    web3.eth.getAccounts (function (error, accounts) {
      if (error) {
        console.log (error);
      }

      var account = accounts[0];

      App.contracts.Adoption
        .deployed ()
        .then (function (instance) {
          adoptionInstance = instance;

          return adoptionInstance.getAdopters.call ();
        })
        .then (function (result) {
          for (i = 0; i < result.length; i++) {
            if (result[i] !== '0x0000000000000000000000000000000000000000') {
              $ ('.NEC-buyer-info-body').text (
                `This NEC was purchased by: ${result[crcId]}`
              );
            }
          }
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
