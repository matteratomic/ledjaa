// SavingsPoolSmartContract.js

const { Block, Blockchain } = require('./SimpleBlockchain');

class SavingsPoolSmartContract {
  constructor() {
    this.blockchain = new Blockchain();
    this.pools = {};
  }

  createPool(poolId, members, goal, lockPeriod) {
    this.pools[poolId] = { members, goal, lockPeriod, balance: {}, lockedUntil: Date.now() + lockPeriod };
    this.blockchain.addBlock(new Block(Date.now(), { action: 'createPool', poolId, members, goal, lockPeriod }));
  }

  deposit(poolId, member, amount, currency) {
    if (this.pools[poolId] && this.pools[poolId].members.includes(member)) {
      if (!this.pools[poolId].balance[currency]) {
        this.pools[poolId].balance[currency] = 0;
      }
      this.pools[poolId].balance[currency] += amount;
      this.blockchain.addBlock(new Block(Date.now(), { action: 'deposit', poolId, member, amount, currency }));
      return true;
    }
    return false;
  }

  withdraw(poolId, member, amount, currency) {
    if (this.pools[poolId] && this.pools[poolId].members.includes(member)) {
      if (Date.now() < this.pools[poolId].lockedUntil) {
        return false; // Cannot withdraw during lock period
      }
      if (this.pools[poolId].balance[currency] >= amount) {
        this.pools[poolId].balance[currency] -= amount;
        this.blockchain.addBlock(new Block(Date.now(), { action: 'withdraw', poolId, member, amount, currency }));
        return true;
      }
    }
    return false;
  }

  getPoolBalance(poolId) {
    return this.pools[poolId] ? this.pools[poolId].balance : null;
  }

  getPoolGoalProgress(poolId) {
    if (!this.pools[poolId]) return null;
    
    const totalBalance = Object.values(this.pools[poolId].balance).reduce((sum, amount) => sum + amount, 0);
    return (totalBalance / this.pools[poolId].goal) * 100;
  }

  extendLockPeriod(poolId, newLockPeriod) {
    if (this.pools[poolId]) {
      this.pools[poolId].lockedUntil = Date.now() + newLockPeriod;
      this.blockchain.addBlock(new Block(Date.now(), { action: 'extendLockPeriod', poolId, newLockPeriod }));
      return true;
    }
    return false;
  }
}

module.exports = SavingsPoolSmartContract;