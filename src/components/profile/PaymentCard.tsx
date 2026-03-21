'use client';

import { useState } from 'react';

interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  ifsc: string;
  isPrimary: boolean;
}

// Mock bank accounts - in production would come from API
const MOCK_ACCOUNTS: BankAccount[] = [];

export function PaymentCard() {
  const [accounts, setAccounts] = useState<BankAccount[]>(MOCK_ACCOUNTS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    accountHolder: '',
    ifsc: '',
  });

  const maskAccountNumber = (number: string): string => {
    if (number.length <= 4) return number;
    return '●●●● ●●●● ' + number.slice(-4);
  };

  const handleAddAccount = () => {
    if (
      !newAccount.bankName ||
      !newAccount.accountNumber ||
      !newAccount.accountHolder ||
      !newAccount.ifsc
    ) {
      return;
    }

    if (newAccount.accountNumber !== newAccount.confirmAccountNumber) {
      alert('Account numbers do not match');
      return;
    }

    const account: BankAccount = {
      id: Date.now().toString(),
      bankName: newAccount.bankName,
      accountNumber: newAccount.accountNumber,
      accountHolder: newAccount.accountHolder,
      ifsc: newAccount.ifsc,
      isPrimary: accounts.length === 0,
    };

    setAccounts([...accounts, account]);
    setNewAccount({
      bankName: '',
      accountNumber: '',
      confirmAccountNumber: '',
      accountHolder: '',
      ifsc: '',
    });
    setShowAddForm(false);
  };

  const handleSetPrimary = (accountId: string) => {
    setAccounts(
      accounts.map((acc) => ({
        ...acc,
        isPrimary: acc.id === accountId,
      }))
    );
  };

  const handleRemoveAccount = (accountId: string) => {
    const updatedAccounts = accounts.filter((acc) => acc.id !== accountId);
    // If removing primary, set first remaining as primary
    if (updatedAccounts.length > 0 && !updatedAccounts.some((acc) => acc.isPrimary)) {
      updatedAccounts[0].isPrimary = true;
    }
    setAccounts(updatedAccounts);
  };

  return (
    <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden">
      {/* Accounts List */}
      {accounts.length > 0 ? (
        <div className="divide-y divide-white/[0.04]">
          {accounts.map((account) => (
            <div key={account.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-zinc-800/50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-white text-sm font-medium">{account.bankName}</p>
                      {account.isPrimary && (
                        <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs rounded-full">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-400 text-sm mb-1">
                      {maskAccountNumber(account.accountNumber)}
                    </p>
                    <p className="text-zinc-500 text-xs">{account.accountHolder}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!account.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(account.id)}
                      className="text-zinc-500 hover:text-gold text-xs transition-colors"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveAccount(account.id)}
                    className="p-2 text-zinc-600 hover:text-red-400 transition-colors"
                    aria-label="Remove account"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <p className="text-zinc-500 text-sm mb-2">No payment methods added</p>
          <p className="text-zinc-600 text-xs">
            Add a bank account for payouts and refunds
          </p>
        </div>
      )}

      {/* Add Account Form */}
      {showAddForm && (
        <div className="p-6 border-t border-white/[0.04] bg-white/[0.02]">
          <h4 className="text-white text-sm font-medium mb-4">Add Bank Account</h4>
          <div className="space-y-4">
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Bank Name
              </label>
              <input
                type="text"
                value={newAccount.bankName}
                onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                placeholder="e.g., HDFC Bank"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Account Number
              </label>
              <input
                type="text"
                value={newAccount.accountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, accountNumber: e.target.value })}
                placeholder="Enter account number"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Confirm Account Number
              </label>
              <input
                type="text"
                value={newAccount.confirmAccountNumber}
                onChange={(e) => setNewAccount({ ...newAccount, confirmAccountNumber: e.target.value })}
                placeholder="Re-enter account number"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Account Holder Name
              </label>
              <input
                type="text"
                value={newAccount.accountHolder}
                onChange={(e) => setNewAccount({ ...newAccount, accountHolder: e.target.value })}
                placeholder="Name as per bank records"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                IFSC Code
              </label>
              <input
                type="text"
                value={newAccount.ifsc}
                onChange={(e) => setNewAccount({ ...newAccount, ifsc: e.target.value.toUpperCase() })}
                placeholder="e.g., HDFC0001234"
                maxLength={11}
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors uppercase"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
                  color: '#0a0a0a',
                }}
              >
                Add Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Button */}
      {!showAddForm && (
        <div className="p-6 border-t border-white/[0.04]">
          <button
            onClick={() => setShowAddForm(true)}
            className="w-full py-3 rounded-xl text-sm font-medium text-gold border border-gold/20 hover:bg-gold/5 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {accounts.length === 0 ? 'Add Bank Account' : 'Add Another Account'}
          </button>
        </div>
      )}
    </div>
  );
}
