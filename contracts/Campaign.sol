// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Campaign 
{
    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping(address => bool) public approvers;
    Request[] public requests;

    modifier restricted()
    {
        require(msg.sender == manager, "Only manager can execute this function!");
        _;
    }

    constructor(uint minimum)
    {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    function contribute() public payable
    {
        require(msg.value >= minimumContribution, "Minimum contribution value required");
        // approvers.push(msg.sender);
        approvers[msg.sender] = true;
    }

    function createRequest(string memory description, uint value, address recipient) public restricted
    {
        /*
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
        */
        Request storage newRequest = requests.push();
        newRequest.description = description;
        newRequest.value = value;
        newRequest.recipient = recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public
    {
        // save cost
        Request storage request = requests[index];

        // valid contributor
        require(approvers[msg.sender], "You has not contributed yet!");

        // not allow vote twice
        require(!request.approvals[msg.sender], "You has voted already!");

        request.approvalCount++;
        request.approvals[msg.sender] = true;
    }
}