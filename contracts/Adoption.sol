pragma solidity ^0.4.4;

contract Adoption {
    address[16] public adopters;

    function adopt(uint mortyId) public returns (uint) {
        require(mortyId >= 0 && mortyId <= 15);

        adopters[mortyId] = msg.sender;

        return mortyId;
    }

    function getAdopters() public returns (address[16]) {
        return adopters;
    }
}