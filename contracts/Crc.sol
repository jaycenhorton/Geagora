pragma solidity ^0.4.4;

contract Crc {

    struct Location {
        string name;
        uint locationId;
        uint previousLocationId;
        uint timeStamp;
    }

    mapping(uint8 => Location) trail;
    uint8 trailCount = 0;

    function addNewLocation(uint locationId, string name) {
        Location memory newLocation;
        newLocation.name = name;
        newLocation.locationId = locationId;
        newLocation.timeStamp = now;

        if (trailCount != 0) {
            newLocation.previousLocationId = trail[trailCount].locationId;
        }   
        trail[trailCount] = newLocation;
        trailCount++;
    }

    function getTrailCount() returns(uint8) {
        return trailCount;
    }

    function getLocation(uint8 trailNo) returns (string, uint, uint, uint) {
        return (trail[trailNo].name, trail[trailNo].locationId, trail[trailNo].previousLocationId, trail[trailNo].timeStamp);
    }
}