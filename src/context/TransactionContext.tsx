'use client';

import { createContext, useContext, useReducer, useEffect, useCallback, useMemo, ReactNode } from 'react';
import {
  TransactionState,
  TransactionAction,
  TransactionStatus,
  PaymentMethod,
  generatePaymentReference,
  LOCK_DURATION_MS,
} from '@/types/transaction';

// Initial State
const initialState: TransactionState = {
  propertyId: null,
  propertyTitle: '',
  units: 1,
  unitPrice: 0,
  totalAmount: 0,
  acknowledged: false,
  paymentMethod: null,
  paymentReference: '',
  lockExpiresAt: null,
  status: 'idle',
  transactionId: null,
};

// Session storage key for persistence
const STORAGE_KEY = 'prophit-transaction';

// Reducer
function transactionReducer(state: TransactionState, action: TransactionAction): TransactionState {
  switch (action.type) {
    case 'INIT_TRANSACTION':
      return {
        ...initialState,
        propertyId: action.propertyId,
        propertyTitle: action.propertyTitle,
        unitPrice: action.unitPrice,
        units: 1,
        totalAmount: action.unitPrice,
        status: 'idle',
      };

    case 'SET_UNITS':
      return {
        ...state,
        units: action.units,
        totalAmount: action.units * state.unitPrice,
      };

    case 'SET_ACKNOWLEDGED':
      return {
        ...state,
        acknowledged: action.acknowledged,
      };

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.method,
      };

    case 'LOCK_UNITS':
      return {
        ...state,
        lockExpiresAt: action.expiresAt,
        paymentReference: action.reference,
        status: 'locked',
      };

    case 'SET_STATUS':
      return {
        ...state,
        status: action.status,
      };

    case 'SET_TRANSACTION_RESULT':
      return {
        ...state,
        status: action.status,
        transactionId: action.transactionId,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

// Context Type
interface TransactionContextType {
  state: TransactionState;
  dispatch: React.Dispatch<TransactionAction>;
  // Convenience methods
  initTransaction: (propertyId: string, propertyTitle: string, unitPrice: number) => void;
  setUnits: (units: number) => void;
  setAcknowledged: (acknowledged: boolean) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  lockUnits: () => void;
  setStatus: (status: TransactionStatus) => void;
  setTransactionResult: (status: TransactionStatus, transactionId: string) => void;
  reset: () => void;
  // Computed values
  isLockExpired: boolean;
  canProceedToPayment: boolean;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

// Provider
export function TransactionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transactionReducer, initialState, (initial) => {
    // Try to restore from session storage on mount
    if (typeof window !== 'undefined') {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Check if lock has expired
          if (parsed.lockExpiresAt && Date.now() > parsed.lockExpiresAt) {
            sessionStorage.removeItem(STORAGE_KEY);
            return initial;
          }
          return parsed;
        } catch {
          return initial;
        }
      }
    }
    return initial;
  });

  // Persist to session storage
  useEffect(() => {
    if (state.status !== 'idle') {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [state]);

  // Check if lock is expired
  const isLockExpired = state.lockExpiresAt ? Date.now() > state.lockExpiresAt : false;

  // Check if user can proceed to payment
  const canProceedToPayment = state.acknowledged && state.units > 0;

  // Memoized action creators
  const initTransaction = useCallback(
    (propertyId: string, propertyTitle: string, unitPrice: number) =>
      dispatch({ type: 'INIT_TRANSACTION', propertyId, propertyTitle, unitPrice }),
    []
  );

  const setUnits = useCallback(
    (units: number) => dispatch({ type: 'SET_UNITS', units }),
    []
  );

  const setAcknowledged = useCallback(
    (acknowledged: boolean) => dispatch({ type: 'SET_ACKNOWLEDGED', acknowledged }),
    []
  );

  const setPaymentMethod = useCallback(
    (method: PaymentMethod) => dispatch({ type: 'SET_PAYMENT_METHOD', method }),
    []
  );

  const lockUnits = useCallback(() => {
    const expiresAt = Date.now() + LOCK_DURATION_MS;
    const reference = generatePaymentReference(state.propertyId || 'UNKNOWN');
    dispatch({ type: 'LOCK_UNITS', expiresAt, reference });
  }, [state.propertyId]);

  const setStatus = useCallback(
    (status: TransactionStatus) => dispatch({ type: 'SET_STATUS', status }),
    []
  );

  const setTransactionResult = useCallback(
    (status: TransactionStatus, transactionId: string) =>
      dispatch({ type: 'SET_TRANSACTION_RESULT', status, transactionId }),
    []
  );

  const reset = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: 'RESET' });
  }, []);

  const value: TransactionContextType = useMemo(() => ({
    state,
    dispatch,
    initTransaction,
    setUnits,
    setAcknowledged,
    setPaymentMethod,
    lockUnits,
    setStatus,
    setTransactionResult,
    reset,
    isLockExpired,
    canProceedToPayment,
  }), [
    state,
    initTransaction,
    setUnits,
    setAcknowledged,
    setPaymentMethod,
    lockUnits,
    setStatus,
    setTransactionResult,
    reset,
    isLockExpired,
    canProceedToPayment,
  ]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
}

// Hook
export function useTransaction() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransaction must be used within a TransactionProvider');
  }
  return context;
}
