// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MovieSubscription {
    address payable public owner;

    uint256 public monthlyFee;
    uint256 public yearlyFee;

    struct UserSubscription {
        uint256 expiryTimestamp;
        bool is4KSupported;
    }

    mapping(address => UserSubscription) public subscriptions;

    event Subscribed(address indexed user, uint256 packageType, uint256 newExpiryTimestamp, uint256 amountPaid);
    event FeesUpdated(uint256 newMonthlyFee, uint256 newYearlyFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    constructor(uint256 _monthlyFeeInWei, uint256 _yearlyFeeInWei) {
        owner = payable(msg.sender);
        monthlyFee = _monthlyFeeInWei;
        yearlyFee = _yearlyFeeInWei;
    }

    function subscribe(uint256 _packageType) external payable {
        uint256 duration;
        uint256 requiredFee;

        if (_packageType == 1) {
            duration = 30 days;
            requiredFee = monthlyFee;
        } else if (_packageType == 2) {
            duration = 365 days;
            requiredFee = yearlyFee;
        } else {
            revert("Invalid package type");
        }

        require(msg.value >= requiredFee, "Insufficient payment amount");

        uint256 currentExpiry = subscriptions[msg.sender].expiryTimestamp;
        uint256 newExpiry;

        if (currentExpiry < block.timestamp) {
            newExpiry = block.timestamp + duration;
        } else {
            newExpiry = currentExpiry + duration;
        }

        subscriptions[msg.sender] = UserSubscription({
            expiryTimestamp: newExpiry,
            is4KSupported: true
        });

        emit Subscribed(msg.sender, _packageType, newExpiry, msg.value);
    }

    function has4KAccess(address _user) external view returns (bool) {
        return subscriptions[_user].expiryTimestamp > block.timestamp && subscriptions[_user].is4KSupported;
    }

    function getExpirationDate(address _user) external view returns (uint256) {
        return subscriptions[_user].expiryTimestamp;
    }


    function updateFees(uint256 _newMonthlyFee, uint256 _newYearlyFee) external onlyOwner {
        monthlyFee = _newMonthlyFee;
        yearlyFee = _newYearlyFee;
        emit FeesUpdated(_newMonthlyFee, _newYearlyFee);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        owner.transfer(balance);
    }
}