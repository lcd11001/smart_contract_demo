// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

contract Campaign 
{
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    // address[] public approvers;
    mapping(address => bool) public approvers;
    uint public approversCount;
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
        approversCount ++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted
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

    function finalizeRequest(uint index) public restricted
    {
        // save cost
        Request storage request = requests[index];

        // not complete request
        require(!request.complete, "Request has completed!");

        // at least 50% approved
        require(request.approvalCount > (approversCount / 2), "The request must have at least 50% approved!");

        request.recipient.transfer(request.value);
        request.complete = true;
    }
}