'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { useFlow } from '@/context/FlowContext';
import { useKYC } from '@/context/KYCContext';
import { AnchorNav } from '@/components/profile/AnchorNav';
import { IdentityCard } from '@/components/profile/IdentityCard';
import { ParticipationSummary } from '@/components/profile/ParticipationSummary';
import { ParticipationTable } from '@/components/profile/ParticipationTable';
import { DocumentsAccordion } from '@/components/profile/DocumentsAccordion';
import { PaymentCard } from '@/components/profile/PaymentCard';
import { SecurityCard } from '@/components/profile/SecurityCard';

// Navigation sections
const NAV_SECTIONS = [
  { id: 'identity', label: 'Profile' },
  { id: 'participation', label: 'Participation' },
  { id: 'documents', label: 'Documents' },
  { id: 'payments', label: 'Payments' },
  { id: 'security', label: 'Security' },
];

export default function ProfilePage() {
  const router = useRouter();
  const { state: flowState, reset } = useFlow();
  const { state: kycState } = useKYC();
  const [activeSection, setActiveSection] = useState('identity');
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth guard
  useEffect(() => {
    if (mounted && (!flowState.displayName || !flowState.isVerified)) {
      router.replace('/');
    }
  }, [flowState.displayName, flowState.isVerified, router, mounted]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_SECTIONS.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleLogout = () => {
    reset();
    router.push('/');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin h-8 w-8 border-2 border-gold border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors py-2 pr-2"
              aria-label="Back to dashboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <Logo className="w-24 h-4" variant="dark" />
            <button
              onClick={handleLogout}
              className="text-zinc-500 hover:text-gold text-sm transition-colors py-2 pl-2"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Anchor Navigation */}
      <AnchorNav
        sections={NAV_SECTIONS}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 pb-24">
        {/* Page Title */}
        <div
          className="mb-10"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.1s forwards' }}
        >
          <h1 className="text-white text-2xl font-medium mb-2">Account</h1>
          <p className="text-zinc-500 text-sm">
            Manage your profile, participation records, and security settings
          </p>
        </div>

        {/* Section 1: Identity & Verification */}
        <section
          id="identity"
          className="mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.15s forwards' }}
        >
          <IdentityCard
            name={flowState.displayName || ''}
            phone={flowState.phone}
            kycState={kycState}
          />
        </section>

        {/* Gold Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-gold/40 to-transparent mb-12" />

        {/* Section 2: Participation Overview */}
        <section
          id="participation"
          className="mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.2s forwards' }}
        >
          <h2 className="text-white text-lg font-medium mb-6">Participation Overview</h2>
          <ParticipationSummary />
          <div className="mt-8">
            <h3 className="text-white text-base font-medium mb-4">My Opportunities</h3>
            <ParticipationTable />
          </div>
        </section>

        {/* Gold Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-gold/40 to-transparent mb-12" />

        {/* Section 3: Documents */}
        <section
          id="documents"
          className="mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.25s forwards' }}
        >
          <h2 className="text-white text-lg font-medium mb-6">Documents & Agreements</h2>
          <DocumentsAccordion />
        </section>

        {/* Gold Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-gold/40 to-transparent mb-12" />

        {/* Section 4: Payments */}
        <section
          id="payments"
          className="mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.3s forwards' }}
        >
          <h2 className="text-white text-lg font-medium mb-6">Payment Methods</h2>
          <PaymentCard />
        </section>

        {/* Gold Divider */}
        <div className="w-16 h-px bg-gradient-to-r from-gold/40 to-transparent mb-12" />

        {/* Section 5: Security */}
        <section
          id="security"
          className="mb-12"
          style={{ opacity: 0, animation: 'fadeInUp 0.5s ease-out 0.35s forwards' }}
        >
          <h2 className="text-white text-lg font-medium mb-6">Security</h2>
          <SecurityCard />
        </section>
      </main>
    </div>
  );
}
