'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// KYC State Interface
interface AadhaarData {
  name: string;
  maskedNumber: string;
  verifiedAt: string;
}

interface PANData {
  number: string;
  name: string;
  verifiedAt: string;
}

interface KYCState {
  currentStep: 1 | 2 | 3;
  aadhaarVerified: boolean;
  aadhaarData: AadhaarData | null;
  panVerified: boolean;
  panData: PANData | null;
  kycCompleted: boolean;
}

type KYCAction =
  | { type: 'SET_AADHAAR_VERIFIED'; payload: AadhaarData }
  | { type: 'SET_PAN_VERIFIED'; payload: PANData }
  | { type: 'COMPLETE_KYC' }
  | { type: 'RESET_KYC' }
  | { type: 'LOAD_STATE'; payload: KYCState };

const initialState: KYCState = {
  currentStep: 1,
  aadhaarVerified: false,
  aadhaarData: null,
  panVerified: false,
  panData: null,
  kycCompleted: false,
};

function kycReducer(state: KYCState, action: KYCAction): KYCState {
  switch (action.type) {
    case 'SET_AADHAAR_VERIFIED':
      return {
        ...state,
        aadhaarVerified: true,
        aadhaarData: action.payload,
        currentStep: 2,
      };
    case 'SET_PAN_VERIFIED':
      return {
        ...state,
        panVerified: true,
        panData: action.payload,
        currentStep: 3,
        kycCompleted: true,
      };
    case 'COMPLETE_KYC':
      return {
        ...state,
        kycCompleted: true,
        currentStep: 3,
      };
    case 'RESET_KYC':
      return initialState;
    case 'LOAD_STATE':
      return action.payload;
    default:
      return state;
  }
}

interface KYCContextType {
  state: KYCState;
  verifyAadhaar: (data: AadhaarData) => void;
  verifyPAN: (data: PANData) => void;
  completeKYC: () => void;
  resetKYC: () => void;
  isKYCComplete: boolean;
  setReturnUrl: (url: string) => void;
  getReturnUrl: () => string | null;
  clearReturnUrl: () => void;
}

const KYCContext = createContext<KYCContextType | undefined>(undefined);

const KYC_STORAGE_KEY = 'prophit_kyc_state';
const KYC_RETURN_URL_KEY = 'prophit_kyc_return_url';

export function KYCProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(kycReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(KYC_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_STATE', payload: parsed });
      } catch {
        // Invalid stored state, use initial
      }
    }
  }, []);

  // Persist state to localStorage on change
  useEffect(() => {
    localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const verifyAadhaar = (data: AadhaarData) => {
    dispatch({ type: 'SET_AADHAAR_VERIFIED', payload: data });
  };

  const verifyPAN = (data: PANData) => {
    dispatch({ type: 'SET_PAN_VERIFIED', payload: data });
  };

  const completeKYC = () => {
    dispatch({ type: 'COMPLETE_KYC' });
  };

  const resetKYC = () => {
    dispatch({ type: 'RESET_KYC' });
    localStorage.removeItem(KYC_STORAGE_KEY);
  };

  const setReturnUrl = (url: string) => {
    localStorage.setItem(KYC_RETURN_URL_KEY, url);
  };

  const getReturnUrl = (): string | null => {
    return localStorage.getItem(KYC_RETURN_URL_KEY);
  };

  const clearReturnUrl = () => {
    localStorage.removeItem(KYC_RETURN_URL_KEY);
  };

  return (
    <KYCContext.Provider
      value={{
        state,
        verifyAadhaar,
        verifyPAN,
        completeKYC,
        resetKYC,
        isKYCComplete: state.kycCompleted,
        setReturnUrl,
        getReturnUrl,
        clearReturnUrl,
      }}
    >
      {children}
    </KYCContext.Provider>
  );
}

export function useKYC() {
  const context = useContext(KYCContext);
  if (!context) {
    throw new Error('useKYC must be used within a KYCProvider');
  }
  return context;
}
