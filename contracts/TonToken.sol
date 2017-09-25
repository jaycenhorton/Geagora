pragma solidity ^0.4.4;
import '../node_modules/zeppelin-solidity/contracts/token/StandardToken.sol';

contract TonToken is StandardToken {
    string public name = "TonToken";
    string public symbol = "TON";
    uint public decimals = 2;
    uint public INITIAL_SUPPLY = 12000;

    function TonToken() {
        totalSupply = INITIAL_SUPPLY;
        balances[msg.sender] = INITIAL_SUPPLY;
    }

}