# Decentralized Movie Subscription Platform

A Web3-based movie streaming platform offering 4K Ultra HD access managed via Ethereum/EVM Smart Contracts.

---

## Smart Contract Overview

- **Network:** Polygon Amoy Testnet / Ethereum Sepolia
- **Contract Address:** `0x0000000000000000000000000000000000000000` *(Replace with your deployed address)*
- **ABI File:** Available in `./build/MovieSubscriptionABI.json`

---

## Key Functions for Frontend & Storage Integration

### 1. `subscribe(uint256 _packageType)` *(Payable)*
Call this function to subscribe or extend an existing membership.
- `_packageType = 1`: **30-Day Pass** (4K Ultra HD) - Requires `monthlyFee`
- `_packageType = 2`: **1-Year Pass** (4K Ultra HD) - Requires `yearlyFee`

### 2. `has4KAccess(address _user)` *(Read-Only / Free Gas)*
Checks if a specific wallet address currently holds active membership rights for 4K streaming.
- **Returns:** `true` if active, `false` if expired or non-subscribed.

### 3. `getExpirationDate(address _user)` *(Read-Only / Free Gas)*
Retrieves the exact expiration timestamp for a given user.
- **Returns:** Unix Timestamp (seconds).

---

## Admin Functions (Owner Only)

- `updateFees(uint256 _newMonthlyFee, uint256 _newYearlyFee)`: Update package pricing in Wei.
- `withdraw()`: Withdraw collected funds from the contract balance.

---

## 📁 Repository Structure

```text
Subscription_Web/
├── contracts/
│   └── MovieSubscription.sol     # Solidity Smart Contract
├── build/
│   └── MovieSubscriptionABI.json # Exported ABI for Web3 integration
└── README.md                     # Project documentation