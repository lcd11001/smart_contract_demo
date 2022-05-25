// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Lottery 
{
    address public manager;
    address public lastWinner;
    address [] public players;

    constructor()
    {
        manager = msg.sender;
    }

    function enter() public payable
    {
        require(msg.value >= 0.01 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint)
    {
        return uint(keccak256(abi.encode(block.difficulty, block.timestamp, players)));
    }

    function pickWinner() public restricted
    {
        uint index = random() % players.length;
        lastWinner = players[index];
        payable(lastWinner).transfer(address(this).balance);

        players = new address[](0);
    }

    modifier restricted()
    {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[] memory)
    {
        return players;
    }

    function getLastWinner() public view returns (address)
    {
        return lastWinner;
    }
}
