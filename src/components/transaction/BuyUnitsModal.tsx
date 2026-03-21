'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UnitStepper } from './UnitStepper';
import { useTransaction } from '@/context/TransactionContext';
import { formatPrice, Property } from '@/lib/propertyData';
import { cn } from '@/lib/utils';

interface BuyUnitsModalProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BuyUnitsModal({ property, open, onOpenChange }: BuyUnitsModalProps) {
  const router = useRouter();
  const { state, setUnits, setAcknowledged, initTransaction, lockUnits } = useTransaction();

  // Initialize transaction when modal opens
  useEffect(() => {
    if (open) {
      initTransaction(property.id, property.title, property.unitPriceInr);
    }
  }, [open, property.id, property.title, property.unitPriceInr, initTransaction]);

  // Calculate max units user can buy
  const maxUnits = Math.min(property.maxUnitsPerTx, property.availableUnits);

  // Handle proceed to payment
  const handleProceed = () => {
    lockUnits();
    onOpenChange(false);
    router.push(`/dashboard/${property.id}/payment`);
  };

  const canProceed = state.acknowledged && state.units > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-bg-primary border-gold/10 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="heading-luxury text-lg text-white">
            Buy Units
          </DialogTitle>
          <p className="text-text-muted text-sm mt-1">{property.title}</p>
        </DialogHeader>

        <div className="p-6 space-y-6">
          {/* Unit Price Info */}
          <div className="bg-bg-card rounded-xl p-4 border border-gold/10">
            <div className="flex justify-between items-center">
              <span className="text-text-muted text-sm">Price per unit</span>
              <span className="text-gold font-semibold">{formatPrice(property.unitPriceInr)}</span>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-text-muted text-sm">Available units</span>
              <span className="text-text-secondary">{property.availableUnits} / {property.totalUnits}</span>
            </div>
          </div>

          {/* Unit Stepper */}
          <div className="py-4">
            <UnitStepper
              value={state.units}
              onChange={setUnits}
              min={property.minUnits}
              max={maxUnits}
            />
            <p className="text-center text-xs text-text-muted mt-3">
              Min: {property.minUnits} · Max: {maxUnits} units per transaction
            </p>
          </div>

          {/* Total Amount */}
          <div className="bg-bg-elevated rounded-xl p-4 border border-gold/20">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary text-sm">Total Amount</span>
              <span className="text-white text-xl font-semibold heading-luxury">
                {formatPrice(state.totalAmount)}
              </span>
            </div>
          </div>

          {/* Escrow Notice */}
          <div className="flex items-start gap-3 p-4 bg-bg-card rounded-xl border border-gold/10">
            <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <p className="text-text-secondary text-sm">
                Funds will be transferred to the project escrow account.
              </p>
              <p className="text-text-muted text-xs mt-1">
                Secured by bank-grade encryption
              </p>
            </div>
          </div>

          {/* Acknowledgment Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <div className="relative flex items-center justify-center mt-0.5">
              <input
                type="checkbox"
                checked={state.acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
                className="sr-only peer"
              />
              <div className={cn(
                'w-5 h-5 rounded border-2 transition-all duration-200',
                'border-gold/30 bg-bg-card',
                'peer-checked:bg-gold peer-checked:border-gold',
                'peer-focus-visible:ring-2 peer-focus-visible:ring-gold/30',
                'group-hover:border-gold/50'
              )}>
                {state.acknowledged && (
                  <svg className="w-full h-full text-bg-primary p-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-text-secondary text-sm leading-relaxed">
              I acknowledge this is a participation in an SPV representing fractional ownership of the property.
            </span>
          </label>

          {/* Proceed Button */}
          <Button
            variant="luxury"
            size="lg"
            className="w-full"
            disabled={!canProceed}
            onClick={handleProceed}
          >
            Proceed to Payment
          </Button>

          {/* Disclaimer */}
          <p className="text-text-muted text-xs text-center">
            Units will be reserved for 10 minutes during payment
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
