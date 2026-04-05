'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SubscriptionState {
  isSubscribed: boolean;
  subscribedAt: string | null;
  plan: 'founding' | 'annual' | null;
}

interface SubscriptionContextType {
  isSubscribed: boolean;
  subscribedAt: string | null;
  plan: 'founding' | 'annual' | null;
  subscribe: (plan: 'founding' | 'annual') => void;
  reset: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

const SUBSCRIPTION_STORAGE_KEY = 'prophit_subscription';

const initialState: SubscriptionState = {
  isSubscribed: false,
  subscribedAt: null,
  plan: null,
};

export function SubscriptionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<SubscriptionState>(initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(SUBSCRIPTION_STORAGE_KEY);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        // Invalid stored state
      }
    }
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(SUBSCRIPTION_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subscribe = (plan: 'founding' | 'annual') => {
    setState({
      isSubscribed: true,
      subscribedAt: new Date().toISOString(),
      plan,
    });
  };

  const reset = () => {
    setState(initialState);
    localStorage.removeItem(SUBSCRIPTION_STORAGE_KEY);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        isSubscribed: state.isSubscribed,
        subscribedAt: state.subscribedAt,
        plan: state.plan,
        subscribe,
        reset,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription() {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
}
