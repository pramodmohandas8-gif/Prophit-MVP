'use client';

import { useState } from 'react';

interface SecurityOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
  isDanger?: boolean;
}

export function SecurityCard() {
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showSessionsModal, setShowSessionsModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handleToggle2FA = () => {
    // In production, trigger 2FA setup flow
    setTwoFAEnabled(!twoFAEnabled);
  };

  const handleViewSessions = () => {
    setShowSessionsModal(true);
  };

  const handleDeleteAccount = () => {
    setShowDeleteConfirm(true);
  };

  const securityOptions: SecurityOption[] = [
    {
      id: 'password',
      title: 'Change Password',
      description: 'Update your account password',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
      action: handleChangePassword,
    },
    {
      id: '2fa',
      title: 'Two-Factor Authentication',
      description: twoFAEnabled ? 'Enabled - Extra security active' : 'Add an extra layer of security',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      action: handleToggle2FA,
    },
    {
      id: 'sessions',
      title: 'Active Sessions',
      description: 'View and manage logged-in devices',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      action: handleViewSessions,
    },
    {
      id: 'delete',
      title: 'Delete Account',
      description: 'Permanently delete your account and data',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      action: handleDeleteAccount,
      isDanger: true,
    },
  ];

  return (
    <>
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden divide-y divide-white/[0.04]">
        {securityOptions.map((option) => (
          <button
            key={option.id}
            onClick={option.action}
            className="w-full p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors text-left"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  option.isDanger
                    ? 'bg-red-500/10 text-red-400'
                    : option.id === '2fa' && twoFAEnabled
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'bg-zinc-800/50 text-zinc-500'
                }`}
              >
                {option.icon}
              </div>
              <div>
                <p
                  className={`text-sm font-medium ${
                    option.isDanger ? 'text-red-400' : 'text-white'
                  }`}
                >
                  {option.title}
                </p>
                <p className="text-zinc-500 text-xs">{option.description}</p>
              </div>
            </div>
            {option.id === '2fa' ? (
              <div
                className={`w-11 h-6 rounded-full transition-colors relative ${
                  twoFAEnabled ? 'bg-emerald-500/30' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full transition-all ${
                    twoFAEnabled ? 'right-1 bg-emerald-400' : 'left-1 bg-zinc-600'
                  }`}
                />
              </div>
            ) : (
              <svg
                className={`w-5 h-5 ${option.isDanger ? 'text-red-400/50' : 'text-zinc-600'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <Modal
          title="Change Password"
          onClose={() => setShowPasswordModal(false)}
        >
          <div className="space-y-4">
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <div>
              <label className="text-zinc-500 text-xs uppercase tracking-wider block mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full bg-[#0a0a0a] border border-white/[0.08] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
            <button
              onClick={() => setShowPasswordModal(false)}
              className="w-full py-3 rounded-xl text-sm font-medium transition-colors mt-2"
              style={{
                background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
                color: '#0a0a0a',
              }}
            >
              Update Password
            </button>
          </div>
        </Modal>
      )}

      {/* Active Sessions Modal */}
      {showSessionsModal && (
        <Modal
          title="Active Sessions"
          onClose={() => setShowSessionsModal(false)}
        >
          <div className="space-y-3">
            {/* Current Session */}
            <div className="p-4 bg-white/[0.02] rounded-xl border border-emerald-500/20">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm">This Device</p>
                    <p className="text-zinc-500 text-xs">Chrome on macOS · Active now</p>
                  </div>
                </div>
                <span className="text-emerald-400 text-xs">Current</span>
              </div>
            </div>

            {/* Other Sessions */}
            <div className="p-4 bg-white/[0.02] rounded-xl">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                    <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm">iPhone 14</p>
                    <p className="text-zinc-500 text-xs">Safari on iOS · 2 hours ago</p>
                  </div>
                </div>
                <button className="text-red-400 text-xs hover:text-red-300 transition-colors">
                  Revoke
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowSessionsModal(false)}
              className="w-full py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors mt-4"
            >
              Close
            </button>
          </div>
        </Modal>
      )}

      {/* Delete Account Confirmation */}
      {showDeleteConfirm && (
        <Modal
          title="Delete Account"
          onClose={() => setShowDeleteConfirm(false)}
        >
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-white text-base font-medium mb-2">Are you sure?</p>
            <p className="text-zinc-500 text-sm mb-6">
              This action cannot be undone. All your data, participation records, and documents will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // In production, delete account
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

// Simple Modal Component
function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-[#0c0c0c] border border-white/[0.08] rounded-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/[0.04]">
          <h3 className="text-white text-base font-medium">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 text-zinc-500 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
