// pages/api/savingsPool.js

import { SavingsPoolSmartContract } from '../../lib/SavingsPoolSmartContract';

const contract = new SavingsPoolSmartContract();

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}

function handlePost(req, res) {
  const { action } = req.body;

  switch (action) {
    case 'createPool':
      const { poolId, members, goal, lockPeriod } = req.body;
      contract.createPool(poolId, members, goal, lockPeriod);
      return res.status(200).json({ message: 'Savings pool created successfully' });

    case 'deposit':
      const { poolId: depositPoolId, member, amount, currency } = req.body;
      const depositSuccess = contract.deposit(depositPoolId, member, amount, currency);
      return res.status(depositSuccess ? 200 : 400).json({ message: depositSuccess ? 'Deposit successful' : 'Failed to deposit' });

    case 'withdraw':
      const { poolId: withdrawPoolId, member: withdrawMember, amount: withdrawAmount, currency: withdrawCurrency } = req.body;
      const withdrawSuccess = contract.withdraw(withdrawPoolId, withdrawMember, withdrawAmount, withdrawCurrency);
      return res.status(withdrawSuccess ? 200 : 400).json({ message: withdrawSuccess ? 'Withdrawal successful' : 'Failed to withdraw' });

    case 'extendLockPeriod':
      const { poolId: lockPoolId, newLockPeriod } = req.body;
      const lockExtendSuccess = contract.extendLockPeriod(lockPoolId, newLockPeriod);
      return res.status(lockExtendSuccess ? 200 : 400).json({ message: lockExtendSuccess ? 'Lock period extended' : 'Failed to extend lock period' });

    default:
      return res.status(400).json({ message: 'Invalid action' });
  }
}

function handleGet(req, res) {
  const { action, poolId } = req.query;

  switch (action) {
    case 'getPoolBalance':
      const balance = contract.getPoolBalance(poolId);
      return res.status(balance !== null ? 200 : 404).json({ balance });

    case 'getPoolGoalProgress':
      const progress = contract.getPoolGoalProgress(poolId);
      return res.status(progress !== null ? 200 : 404).json({ progress });

    default:
      return res.status(400).json({ message: 'Invalid action' });
  }
}