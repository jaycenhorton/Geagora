pragma solidity ^0.4.4;

contract Adoption {
    address[16] public adopters;

    function adopt(uint crcId) public returns (uint) {
        require(crcId >= 0 && crcId <= 15);

        adopters[crcId] = msg.sender;

        return crcId;
    }

    function getAdopters() public returns (address[16]) {
        return adopters;
    }
}