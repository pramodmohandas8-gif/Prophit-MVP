'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { useKYC } from '@/context/KYCContext';
import { useSubscription } from '@/context/SubscriptionContext';
import { getPropertyById, formatPrice } from '@/lib/propertyData';
import { BuyUnitsModal } from '@/components/transaction/BuyUnitsModal';

// Property Detail Components
import { ImageGallery } from '@/components/property/ImageGallery';
import { StickyPurchaseCard } from '@/components/property/StickyPurchaseCard';
import { OpportunityHighlights } from '@/components/property/OpportunityHighlights';
import { LocationSection } from '@/components/property/LocationSection';
import { TrustSection } from '@/components/property/TrustSection';
import { MarketContext } from '@/components/property/MarketContext';
import { ParticipationOverview } from '@/components/property/ParticipationOverview';

export default function PropertyDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { state } = useFlow();
  const { isKYCComplete, setReturnUrl } = useKYC();
  const { isSubscribed } = useSubscription();
  const [buyModalOpen, setBuyModalOpen] = useState(false);

  const property = getPropertyById(params.id as string);

  // Handle participation - check KYC first
  const handleParticipate = () => {
    if (!isKYCComplete) {
      // Store current URL to return after KYC completion
      setReturnUrl(window.location.pathname);
      router.push('/kyc');
    } else {
      setBuyModalOpen(true);
    }
  };

  // Use real images array if available, otherwise generate mock variations
  const images = property
    ? property.images && property.images.length > 0
      ? property.images
      : [
          property.image,
          property.image.replace('?w=800', '?w=800&q=80'),
          property.image.replace('?w=800', '?w=800&blur=0'),
        ]
    : [];

  // Auth guard
  useEffect(() => {
    if (!state.displayName || !state.isVerified) {
      router.replace('/');
    }
  }, [state.displayName, state.isVerified, router]);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">Property not found.</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="text-gold hover:text-gold/80 text-sm transition-colors"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* ═══════════════════════════════════════════════════════════════
          HEADER: Navigation + Logo
          ═══════════════════════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Back Button + Logo */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 pr-2"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <Logo className="w-28 h-5" variant="dark" />
            </div>

            {/* Property Quick Info - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <p className="text-white text-sm font-medium truncate max-w-[200px]">
                  {isSubscribed ? property.title : (
                    <>
                      {property.title.split(' ').slice(0, 2).join(' ')}{' '}
                      <span className="select-none blur-[5px]">{property.title.split(' ').slice(2).join(' ')}</span>
                    </>
                  )}
                </p>
                <p className="text-zinc-500 text-xs">{isSubscribed ? `${property.locality}, ${property.city}` : property.city}</p>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-right">
                <p className="text-gold text-sm font-semibold">{formatPrice(property.unitPriceInr)}</p>
                <p className="text-zinc-500 text-xs">per unit</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          MAIN CONTENT: Two-column layout on desktop
          ═══════════════════════════════════════════════════════════════ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">

          {/* ─────────────────────────────────────────────────────────────
              LEFT COLUMN: Gallery + Content Sections
              ───────────────────────────────────────────────────────────── */}
          <div className="lg:col-span-8 space-y-8">

            {/* Image Gallery */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}>
              <ImageGallery images={images} title={property.title} />
            </section>

            {/* Mobile-only: Property Title + Price */}
            <section className="lg:hidden" style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}>
              <h1 className="text-white text-xl font-semibold mb-1">
                {isSubscribed ? property.title : (
                  <>
                    {property.title.split(' ').slice(0, 2).join(' ')}{' '}
                    <span className="select-none blur-[5px]">{property.title.split(' ').slice(2).join(' ')}</span>
                  </>
                )}
              </h1>
              <p className="text-zinc-500 text-sm mb-4">{isSubscribed ? `${property.locality}, ${property.city}` : property.city}</p>
              <div className="flex items-baseline gap-3">
                <span className="text-gold text-2xl font-semibold">{formatPrice(property.unitPriceInr)}</span>
                <span className="text-zinc-500 text-sm">per unit</span>
              </div>
            </section>

            {/* Opportunity Highlights */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}>
              <OpportunityHighlights property={property} />
            </section>

            {/* Location Section */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.4s forwards' }}>
              <LocationSection property={property} />
            </section>

            {/* Trust & Verification Section */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.5s forwards' }}>
              <TrustSection property={property} />
            </section>

            {/* Market Context */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.6s forwards' }}>
              <MarketContext property={property} />
            </section>

            {/* Participation Overview */}
            <section style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.7s forwards' }}>
              <ParticipationOverview property={property} />
            </section>

            {/* Disclaimer */}
            <footer className="py-8 border-t border-white/[0.06]" style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.8s forwards' }}>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-6" />
              <p className="text-zinc-500 text-xs text-center leading-relaxed max-w-xl mx-auto">
                This listing is for informational purposes only. Exit timelines depend on contractual
                conditions and market factors. Please review all documents carefully before participation.
                Verified by Prophit&apos;s legal partner. This is not financial advice.
              </p>
            </footer>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              RIGHT COLUMN: Sticky Purchase Card (Desktop only)
              ───────────────────────────────────────────────────────────── */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24">
              <StickyPurchaseCard
                property={property}
                onBuyUnits={handleParticipate}
                isKYCComplete={isKYCComplete}
              />
            </div>
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════
          MOBILE BOTTOM BAR: Fixed Purchase CTA
          ═══════════════════════════════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.06] safe-bottom">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-zinc-500 text-xs">Unit Price</p>
              <p className="text-gold text-lg font-semibold">{formatPrice(property.unitPriceInr)}</p>
            </div>
            <div className="text-right">
              <p className="text-zinc-500 text-xs">Available</p>
              <p className="text-white text-sm font-medium">{property.availableUnits} available</p>
            </div>
          </div>
          <button
            onClick={handleParticipate}
            disabled={property.availableUnits === 0}
            className="w-full py-3.5 rounded-xl font-medium text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: property.availableUnits === 0
                ? '#333'
                : 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
              color: property.availableUnits === 0 ? '#666' : '#0a0a0a',
            }}
          >
            {property.availableUnits === 0
              ? 'Sold Out'
              : isKYCComplete
              ? 'Participate'
              : 'Complete KYC'}
          </button>
        </div>
      </div>

      {/* Spacer for mobile bottom bar */}
      <div className="lg:hidden h-32" />

      {/* ═══════════════════════════════════════════════════════════════
          BUY UNITS MODAL
          ═══════════════════════════════════════════════════════════════ */}
      <BuyUnitsModal
        property={property}
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
      />
    </div>
  );
}
