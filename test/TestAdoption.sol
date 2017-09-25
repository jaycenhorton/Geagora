pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Adoption.sol";

contract TestAdoption {
  Adoption adoption = Adoption(DeployedAddresses.Adoption());

    function testUserCanAdoptMorty() {
        uint returnedId = adoption.adopt(8);

        uint expected = 8;

        Assert.equal(returnedId, expected, "Adoption of morty ID 8 should be recorded.");
    }

    function testGetAdopterAddressByMortyId() {
        address expected = this;

        address adopter = adoption.adopters(8);

        Assert.equal(adopter, expected, "Owner of morty ID 8 should be recorded.");
    }

    function testGetAdopterAddressByMortyIdInArray() {
        address expected = this;

        address[16] memory adopters = adoption.getAdopters();

        Assert.equal(adopters[8], expected, "Owner of morty ID 8 should be recorded.");
    }
}