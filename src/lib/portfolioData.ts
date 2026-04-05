// Portfolio Lifecycle State Machine
// ================================
// Allowed transitions:
// payment_received → raise_in_progress
// raise_in_progress → fully_subscribed
// raise_in_progress → raise_failed
// fully_subscribed → sale_transferred
// sale_transferred → locked_in
// locked_in → exit_window_open
// exit_window_open → exited

export type LifecycleStatus =
  | 'payment_received'
  | 'raise_in_progress'
  | 'fully_subscribed'
  | 'sale_transferred'
  | 'locked_in'
  | 'exit_window_open'
  | 'exited'
  | 'raise_failed';

export interface PortfolioAsset {
  id: string;
  name: string;
  unitsHeld: number;
  unitPrice: number;
  participationDate: string;
  lifecycleStatus: LifecycleStatus;
  totalUnits: number;
  subscribedUnits: number;
  expectedCloseDate?: string;
  saleTransferDate?: string;
  lockInEndDate?: string;
  exitDate?: string;
  exitSettlementAmount?: number;
  escrowProtected: boolean;
  locality?: string;
  city?: string;
}

export interface TimelineEvent {
  id: string;
  label: string;
  date: string | null;
  status: 'completed' | 'current' | 'upcoming';
}

// Lifecycle status display configuration
export const LIFECYCLE_CONFIG: Record<LifecycleStatus, {
  label: string;
  description: string;
  color: 'gold' | 'emerald' | 'blue' | 'zinc' | 'amber' | 'red';
}> = {
  payment_received: {
    label: 'Payment Confirmed',
    description: 'Your participation has been recorded',
    color: 'gold',
  },
  raise_in_progress: {
    label: 'Capital Raise In Progress',
    description: 'Subscription is open for this opportunity',
    color: 'amber',
  },
  fully_subscribed: {
    label: 'Fully Subscribed',
    description: 'Capital raise completed successfully',
    color: 'emerald',
  },
  sale_transferred: {
    label: 'Sale Transferred',
    description: 'Asset ownership has been transferred to LLP',
    color: 'blue',
  },
  locked_in: {
    label: 'Locked In',
    description: 'Asset is in lock-in period',
    color: 'blue',
  },
  exit_window_open: {
    label: 'Exit Window Open',
    description: 'Exit opportunity is available',
    color: 'gold',
  },
  exited: {
    label: 'Exited',
    description: 'Participation has been settled',
    color: 'zinc',
  },
  raise_failed: {
    label: 'Raise Unsuccessful',
    description: 'Funds will be returned to escrow',
    color: 'red',
  },
};

// Mock Portfolio Data
export const PORTFOLIO_ASSETS: PortfolioAsset[] = [
  {
    id: 'sg-c24',
    name: 'Plot C-24 – Shubham Greens',
    unitsHeld: 5,
    unitPrice: 48000,
    participationDate: '2025-02-10',
    lifecycleStatus: 'raise_in_progress',
    totalUnits: 120,
    subscribedUnits: 74,
    expectedCloseDate: '2025-04-30',
    escrowProtected: true,
    locality: 'Talwandi',
    city: 'Kota',
  },
  {
    id: 'cidco-nm-12',
    name: 'CIDCO Plot 12 – Navi Mumbai',
    unitsHeld: 3,
    unitPrice: 72000,
    participationDate: '2024-08-14',
    lifecycleStatus: 'locked_in',
    totalUnits: 80,
    subscribedUnits: 80,
    saleTransferDate: '2024-10-01',
    lockInEndDate: '2026-02-14',
    escrowProtected: false,
    locality: 'Kharghar',
    city: 'Navi Mumbai',
  },
  {
    id: 'raipur-commercial-7',
    name: 'Raipur Commercial Plot 7',
    unitsHeld: 4,
    unitPrice: 55000,
    participationDate: '2023-03-12',
    lifecycleStatus: 'exited',
    totalUnits: 60,
    subscribedUnits: 60,
    saleTransferDate: '2023-05-01',
    lockInEndDate: '2024-05-01',
    exitDate: '2024-06-10',
    exitSettlementAmount: 268000,
    escrowProtected: false,
    locality: 'Telibandha',
    city: 'Raipur',
  },
];

// Helper functions
export function getAssetById(id: string): PortfolioAsset | undefined {
  return PORTFOLIO_ASSETS.find(asset => asset.id === id);
}

export function calculatePortfolioSummary(assets: PortfolioAsset[]) {
  let totalCapital = 0;
  let totalUnits = 0;
  let activeOpportunities = 0;
  let closedOpportunities = 0;
  let fundsInEscrow = 0;
  let currentExposure = 0;

  assets.forEach(asset => {
    const participationValue = asset.unitsHeld * asset.unitPrice;
    totalCapital += participationValue;
    totalUnits += asset.unitsHeld;

    if (asset.lifecycleStatus === 'exited' || asset.lifecycleStatus === 'raise_failed') {
      closedOpportunities++;
    } else {
      activeOpportunities++;
      // Current exposure = value of all non-exited holdings
      currentExposure += participationValue;
    }

    if (asset.escrowProtected && asset.lifecycleStatus === 'raise_in_progress') {
      fundsInEscrow += participationValue;
    }
  });

  return {
    totalCapital,
    totalUnits,
    activeOpportunities,
    closedOpportunities,
    fundsInEscrow,
    currentExposure,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${new Intl.NumberFormat('en-IN').format(amount)}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function getTimelineEvents(asset: PortfolioAsset): TimelineEvent[] {
  const events: TimelineEvent[] = [];
  const statusOrder: LifecycleStatus[] = [
    'payment_received',
    'raise_in_progress',
    'fully_subscribed',
    'sale_transferred',
    'locked_in',
    'exit_window_open',
    'exited',
  ];

  const currentIndex = statusOrder.indexOf(asset.lifecycleStatus);

  // Participation Confirmed
  events.push({
    id: 'participation',
    label: 'Participation Confirmed',
    date: asset.participationDate,
    status: 'completed',
  });

  // Escrow Secured (for raise_in_progress)
  if (asset.escrowProtected || asset.lifecycleStatus !== 'raise_in_progress') {
    events.push({
      id: 'escrow',
      label: 'Escrow Secured',
      date: asset.participationDate,
      status: currentIndex >= 0 ? 'completed' : 'upcoming',
    });
  }

  // Capital Raise Closed
  if (asset.lifecycleStatus === 'raise_in_progress') {
    events.push({
      id: 'raise_closed',
      label: 'Capital Raise Closes',
      date: asset.expectedCloseDate || null,
      status: 'current',
    });
  } else if (currentIndex >= statusOrder.indexOf('fully_subscribed')) {
    events.push({
      id: 'raise_closed',
      label: 'Capital Raise Closed',
      date: asset.expectedCloseDate || null,
      status: 'completed',
    });
  }

  // Sale Transferred
  if (currentIndex >= statusOrder.indexOf('sale_transferred')) {
    events.push({
      id: 'sale_transfer',
      label: 'Sale Transferred',
      date: asset.saleTransferDate || null,
      status: 'completed',
    });
  } else if (currentIndex >= statusOrder.indexOf('fully_subscribed')) {
    events.push({
      id: 'sale_transfer',
      label: 'Sale Transfer',
      date: null,
      status: 'upcoming',
    });
  }

  // Lock-in Started
  if (currentIndex >= statusOrder.indexOf('locked_in')) {
    events.push({
      id: 'lockin_start',
      label: 'Lock-in Started',
      date: asset.saleTransferDate || null,
      status: 'completed',
    });
  }

  // Lock-in End / Exit Window
  if (asset.lockInEndDate) {
    if (currentIndex >= statusOrder.indexOf('exit_window_open')) {
      events.push({
        id: 'exit_window',
        label: 'Exit Window Opened',
        date: asset.lockInEndDate,
        status: 'completed',
      });
    } else if (asset.lifecycleStatus === 'locked_in') {
      events.push({
        id: 'exit_window',
        label: 'Exit Window Opens',
        date: asset.lockInEndDate,
        status: 'current',
      });
    }
  }

  // Exited
  if (asset.lifecycleStatus === 'exited' && asset.exitDate) {
    events.push({
      id: 'exited',
      label: 'Exited',
      date: asset.exitDate,
      status: 'completed',
    });
  }

  return events;
}

// Days remaining until a date
export function getDaysRemaining(dateString: string): number {
  const targetDate = new Date(dateString);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Completed Transaction Storage
const COMPLETED_TRANSACTIONS_KEY = 'prophit-completed-transactions';

export interface CompletedTransaction {
  id: string;
  propertyId: string;
  propertyTitle: string;
  units: number;
  unitPrice: number;
  totalAmount: number;
  transactionId: string;
  completedAt: string;
  status: 'success' | 'pending';
}

export function saveCompletedTransaction(transaction: CompletedTransaction): void {
  if (typeof window === 'undefined') return;

  const existing = getCompletedTransactions();
  // Avoid duplicates by transactionId
  const filtered = existing.filter(t => t.transactionId !== transaction.transactionId);
  filtered.push(transaction);
  localStorage.setItem(COMPLETED_TRANSACTIONS_KEY, JSON.stringify(filtered));
}

export function getCompletedTransactions(): CompletedTransaction[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(COMPLETED_TRANSACTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function convertTransactionToAsset(transaction: CompletedTransaction): PortfolioAsset {
  const today = new Date().toISOString().split('T')[0];

  return {
    id: transaction.transactionId,
    name: transaction.propertyTitle,
    unitsHeld: transaction.units,
    unitPrice: transaction.unitPrice,
    participationDate: transaction.completedAt.split('T')[0] || today,
    lifecycleStatus: transaction.status === 'success' ? 'payment_received' : 'raise_in_progress',
    totalUnits: 100, // Default for new transactions
    subscribedUnits: transaction.units,
    escrowProtected: true,
  };
}

export function getAllPortfolioAssets(): PortfolioAsset[] {
  const transactions = getCompletedTransactions();
  const transactionAssets = transactions.map(convertTransactionToAsset);

  // Merge: new transactions at the top, then existing mock data
  return [...transactionAssets, ...PORTFOLIO_ASSETS];
}
