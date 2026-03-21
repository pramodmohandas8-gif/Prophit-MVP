// Transaction flow TypeScript interfaces

export interface UnitPricing {
  unitPriceInr: number;
  totalUnits: number;
  availableUnits: number;
  minUnits: number;
  maxUnitsPerTx: number;
}

export type PaymentMethod = 'UPI' | 'NEFT';
export type TransactionStatus = 'idle' | 'locked' | 'pending' | 'success' | 'failed';

export interface TransactionState {
  propertyId: string | null;
  propertyTitle: string;
  units: number;
  unitPrice: number;
  totalAmount: number;
  acknowledged: boolean;
  paymentMethod: PaymentMethod | null;
  paymentReference: string;
  lockExpiresAt: number | null;
  status: TransactionStatus;
  transactionId: string | null;
}

export interface PaymentVerificationPayload {
  propertyId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  reference: string;
  units: number;
}

export interface PaymentVerificationResponse {
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  message?: string;
}

// SPV Bank details for NEFT transfers
export interface BankDetails {
  accountName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export const SPV_BANK_DETAILS: BankDetails = {
  accountName: 'Prophit SPV Trust',
  bankName: 'ICICI Bank',
  accountNumber: '123456789012',
  ifscCode: 'ICIC0001234',
};

// UPI configuration
export const UPI_CONFIG = {
  vpa: 'prophit@icici',
  payeeName: 'Prophit',
  currency: 'INR',
};

// Transaction action types for reducer
export type TransactionAction =
  | { type: 'INIT_TRANSACTION'; propertyId: string; propertyTitle: string; unitPrice: number }
  | { type: 'SET_UNITS'; units: number }
  | { type: 'SET_ACKNOWLEDGED'; acknowledged: boolean }
  | { type: 'SET_PAYMENT_METHOD'; method: PaymentMethod }
  | { type: 'LOCK_UNITS'; expiresAt: number; reference: string }
  | { type: 'SET_STATUS'; status: TransactionStatus }
  | { type: 'SET_TRANSACTION_RESULT'; status: TransactionStatus; transactionId: string }
  | { type: 'RESET' };

// Helper to generate unique payment reference
export function generatePaymentReference(propertyId: string): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  return `PROPHIT-${propertyId}-${timestamp}-${random}`;
}

// Helper to generate UPI deep link
export function generateUPILink(amount: number, reference: string): string {
  const params = new URLSearchParams({
    pa: UPI_CONFIG.vpa,
    pn: UPI_CONFIG.payeeName,
    am: amount.toString(),
    cu: UPI_CONFIG.currency,
    tn: reference,
  });
  return `upi://pay?${params.toString()}`;
}

// Lock duration in milliseconds (10 minutes)
export const LOCK_DURATION_MS = 10 * 60 * 1000;
