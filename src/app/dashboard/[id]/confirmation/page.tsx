'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useFlow } from '@/context/FlowContext';
import { useTransaction } from '@/context/TransactionContext';
import { getPropertyById, formatPrice } from '@/lib/propertyData';
import { saveCompletedTransaction } from '@/lib/portfolioData';
import { Button } from '@/components/ui/button';

export default function ConfirmationPage() {
  const router = useRouter();
  const params = useParams();
  const { state: flowState } = useFlow();
  const { state, reset } = useTransaction();

  const propertyId = params.id as string;
  const property = getPropertyById(propertyId);

  // Auth guard
  useEffect(() => {
    if (!flowState.displayName || !flowState.isVerified) {
      router.replace('/');
    }
  }, [flowState.displayName, flowState.isVerified, router]);

  // Transaction guard - must have a completed or pending transaction
  useEffect(() => {
    if (state.status !== 'success' && state.status !== 'pending') {
      router.replace(`/dashboard/${propertyId}`);
    }
  }, [state.status, propertyId, router]);

  const handleGoToPortfolio = () => {
    // Save the completed transaction before navigating
    if (state.transactionId && property) {
      saveCompletedTransaction({
        id: state.transactionId,
        propertyId: propertyId,
        propertyTitle: property.title,
        units: state.units,
        unitPrice: state.unitPrice,
        totalAmount: state.totalAmount,
        transactionId: state.transactionId,
        completedAt: new Date().toISOString(),
        status: 'success',
      });
    }
    reset();
    router.push('/portfolio');
  };

  const handleBackToDashboard = () => {
    reset();
    router.push('/dashboard');
  };

  // Early return if not ready
  if (!property || (state.status !== 'success' && state.status !== 'pending')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  const isSuccess = state.status === 'success';

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          {/* Status Icon */}
          <div className="flex justify-center mb-6">
            {isSuccess ? (
              <div className="w-20 h-20 rounded-full bg-success/20 flex items-center justify-center animate-scale-in">
                <svg className="w-10 h-10 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full bg-gold/20 flex items-center justify-center animate-scale-in">
                <svg className="w-10 h-10 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            )}
          </div>

          {/* Status Message */}
          <h1 className="text-2xl font-medium text-white heading-luxury mb-2">
            {isSuccess ? 'Payment Successful!' : 'Payment Under Verification'}
          </h1>
          <p className="text-text-muted text-sm mb-8">
            {isSuccess
              ? 'Your purchase has been confirmed.'
              : 'Your bank transfer is being verified. You will be notified once confirmed.'}
          </p>

          {/* Transaction Details Card */}
          <div className="bg-bg-card rounded-2xl p-6 border border-gold/10 text-left mb-8">
            <div className="space-y-4">
              {/* Property */}
              <div>
                <p className="text-text-muted text-xs mb-1">Property</p>
                <p className="text-white font-medium">{property.title}</p>
              </div>

              {/* Units */}
              <div className="flex justify-between items-center py-3 border-t border-gold/5">
                <span className="text-text-muted text-sm">Units Purchased</span>
                <span className="text-white font-medium">{state.units}</span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center py-3 border-t border-gold/5">
                <span className="text-text-muted text-sm">Amount Paid</span>
                <span className="text-gold font-semibold">{formatPrice(state.totalAmount)}</span>
              </div>

              {/* Transaction ID */}
              {state.transactionId && (
                <div className="py-3 border-t border-gold/5">
                  <p className="text-text-muted text-xs mb-1">Transaction ID</p>
                  <p className="text-text-secondary font-mono text-sm break-all">{state.transactionId}</p>
                </div>
              )}

              {/* Payment Method */}
              <div className="flex justify-between items-center py-3 border-t border-gold/5">
                <span className="text-text-muted text-sm">Payment Method</span>
                <span className="text-text-secondary">{state.paymentMethod === 'UPI' ? 'UPI' : 'Bank Transfer'}</span>
              </div>
            </div>
          </div>

          {/* Pending Notice */}
          {!isSuccess && (
            <div className="bg-gold/5 rounded-xl p-4 border border-gold/20 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-gold text-sm font-medium">Verification Timeline</p>
                  <p className="text-text-muted text-xs mt-1">
                    Bank transfers typically take 1-2 business days to verify. We&apos;ll notify you via SMS once confirmed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action Button */}
          <Button
            variant="luxury"
            size="lg"
            className="w-full"
            onClick={isSuccess ? handleGoToPortfolio : handleBackToDashboard}
          >
            {isSuccess ? 'Go to Portfolio' : 'Back to Dashboard'}
          </Button>

          {/* Support Link */}
          <p className="text-text-muted text-xs mt-6">
            Need help?{' '}
            <button className="text-gold hover:underline">Contact Support</button>
          </p>
        </div>
      </main>
    </div>
  );
}
