'use client';

import { useState } from 'react';
import { Property, formatPrice } from '@/lib/propertyData';
import { cn } from '@/lib/utils';
import { DocumentsModal } from '@/components/property/DocumentsModal';

interface TrustSectionProps {
  property: Property;
}

// ── Friendly document label mapping (fallback for legacy listings) ────

const DOC_LABEL_MAP: Record<string, string> = {
  'allotment.pdf': 'Allotment Letter',
  'ec.pdf': 'Encumbrance Certificate',
  'siteplan.pdf': 'Site Plan',
  'noida_auction.pdf': 'Auction Document',
  'map.pdf': 'Site Map',
  'hlpp_lec.pdf': 'Land Entitlement Certificate',
  'policy.pdf': 'Policy Document',
  'nicdc_tender.pdf': 'Tender Document',
  'envclear.pdf': 'Environmental Clearance',
  'buyback_clause.pdf': 'Buyback Agreement',
  'escrow_conf.pdf': 'Escrow Confirmation',
  'rera.pdf': 'Project Registration (RERA)',
  'mun_auction.pdf': 'Municipal Auction Record',
  'conv_application.pdf': 'Conversion Application',
  'port_tender.pdf': 'Port Tender Document',
  'mou_institution.pdf': 'Institutional MOU',
  'escrow.pdf': 'Escrow Confirmation',
  'title_search.pdf': 'Title Search Report',
  'llp_agreement.pdf': 'LLP Agreement',
  'valuation.pdf': 'Valuation Report',
  'municipal_minutes.pdf': 'Municipal Minutes',
};

// ── Trust signal generation ──────────────────────────────────────────

interface TrustSignal {
  title: string;
  helper: string;
}

function getTrustSignals(property: Property): TrustSignal[] {
  // Use property-specific overrides if available
  if (property.trustSignals && property.trustSignals.length > 0) {
    return property.trustSignals;
  }

  // Auto-generate from property data
  const signals: TrustSignal[] = [];

  if (property.titleClearance) {
    signals.push({ title: 'Ownership Verified', helper: 'Based on registry and land records' });
  }
  if (property.issuingAuthority || property.allotmentRef) {
    signals.push({ title: 'Land Use Approved', helper: 'Validated through authority approvals' });
  }
  if (property.reraNumber) {
    signals.push({ title: 'Project Registered (RERA)', helper: 'RERA compliant' });
  } else {
    signals.push({ title: 'Regulatory Clearance', helper: `Issued by ${property.issuingAuthority}` });
  }
  if (property.ecLast30Yrs) {
    signals.push({ title: 'Clear Title History', helper: 'Encumbrance clear for 30 years' });
  }
  signals.push({ title: 'Key Documents Reviewed', helper: 'All critical documents verified before listing' });

  return signals;
}

// ── Detailed verification data (tabbed deep-dive) ────────────────────

type TabType = 'ownership' | 'approvals' | 'legal' | 'structure';

interface VerificationItem {
  label: string;
  status: 'verified' | 'pending' | 'na';
  detail: string;
}

const detailTabs: { id: TabType; label: string }[] = [
  { id: 'ownership', label: 'Ownership' },
  { id: 'approvals', label: 'Approvals' },
  { id: 'legal', label: 'Legal Review' },
  { id: 'structure', label: 'Structure' },
];

function getTabContent(tab: TabType, property: Property): VerificationItem[] {
  switch (tab) {
    case 'ownership':
      return [
        {
          label: 'Title Verification',
          status: property.titleClearance ? 'verified' : 'pending',
          detail: property.titleClearance ? 'Confirmed with issuing authority' : 'Verification in progress',
        },
        {
          label: 'Encumbrance Check',
          status: property.ecLast30Yrs ? 'verified' : 'pending',
          detail: property.ecLast30Yrs ? 'Clear for last 30 years' : 'Under review',
        },
        {
          label: 'Allotment Reference',
          status: property.allotmentRef ? 'verified' : 'na',
          detail: property.allotmentRef || 'Not applicable',
        },
        {
          label: 'Transfer Rights',
          status: 'verified',
          detail: `${property.tenureType} ownership with transfer allowed`,
        },
      ];
    case 'approvals':
      return [
        {
          label: 'Issuing Authority',
          status: property.issuingAuthority ? 'verified' : 'na',
          detail: property.issuingAuthority || 'Direct ownership',
        },
        {
          label: 'RERA Registration',
          status: property.reraNumber ? 'verified' : 'na',
          detail: property.reraNumber || 'Not applicable for this asset type',
        },
        {
          label: 'Land Use Approval',
          status: 'verified',
          detail: `Approved for ${property.assetType.toLowerCase()} use`,
        },
        {
          label: 'Building Permits',
          status: property.assetType.includes('Plot') ? 'na' : 'verified',
          detail: property.assetType.includes('Plot') ? 'Land asset - NA' : 'All permits in place',
        },
      ];
    case 'legal':
      return [
        { label: 'Legal Partner Review', status: 'verified', detail: 'Reviewed by Prophit legal partner' },
        { label: 'Documentation Audit', status: 'verified', detail: 'All documents verified and archived' },
        { label: 'Dispute Check', status: 'verified', detail: 'No ongoing litigation or disputes' },
        { label: 'Compliance Status', status: 'verified', detail: 'Fully compliant with applicable regulations' },
      ];
    case 'structure':
      return [
        { label: 'Participation Type', status: 'verified', detail: 'LLP (Limited Liability Partnership)' },
        {
          label: 'Fund Handling',
          status: 'verified',
          detail: property.escrowAmountInr > 0 ? `Escrow via ${property.escrowBankName}` : 'Regulated account structure',
        },
        {
          label: 'Unit Tokenization',
          status: 'verified',
          detail: `${property.totalUnits} units at ${formatPrice(property.unitPriceInr)} each`,
        },
        {
          label: 'Exit Mechanism',
          status: 'verified',
          detail: `${property.exitType} defined in agreement`,
        },
      ];
  }
}

// ── Status badge ─────────────────────────────────────────────────────

function StatusBadge({ status }: { status: VerificationItem['status'] }) {
  switch (status) {
    case 'verified':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Verified
        </span>
      );
    case 'pending':
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-xs">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Pending
        </span>
      );
    case 'na':
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-500/10 text-zinc-400 text-xs">
          N/A
        </span>
      );
  }
}

// ── Main component ───────────────────────────────────────────────────

export function TrustSection({ property }: TrustSectionProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('ownership');

  const signals = getTrustSignals(property);
  return (
    <section className="py-10 border-t border-white/[0.06]">
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.08] flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-emerald-400/70" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
          </div>
          <h2 className="text-white text-base font-medium tracking-wide">
            Verified &amp; Ready for Participation
          </h2>
        </div>

        {/* Trust Signal Checklist */}
        <div className="space-y-4 mb-6">
          {signals.map((signal, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <svg className="w-4 h-4 text-emerald-400/60" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <p className="text-white/90 text-sm font-medium leading-tight">{signal.title}</p>
                <p className="text-zinc-500 text-xs mt-0.5">{signal.helper}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-5" />

        {/* Microcopy */}
        <p className="text-zinc-400 text-xs leading-relaxed mb-1">
          Verified through legal and regulatory documents before listing on Prophit.
        </p>
        <p className="text-zinc-500 text-xs mb-5">
          Full documents available for review.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {/* View Documents */}
          <button
            onClick={() => setDocsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                       bg-white/[0.04] border border-white/[0.08] text-zinc-300
                       hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            View Documents
          </button>

          {/* Detailed Verification */}
          <button
            onClick={() => setDetailsOpen(!detailsOpen)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
                       bg-white/[0.04] border border-white/[0.08] text-zinc-300
                       hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white
                       transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
            Detailed Verification
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${detailsOpen ? 'rotate-180' : ''}`}
              fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* ── Expandable: Detailed Verification (Tabs) ──────────────── */}
        {detailsOpen && (
          <div className="mt-5 pt-5 border-t border-white/[0.06]">
            <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-4">
              Verification Details
            </p>

            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
              {detailTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    'px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all',
                    activeTab === tab.id
                      ? 'bg-gold/10 text-gold border border-gold/20'
                      : 'bg-white/[0.03] text-zinc-400 border border-transparent hover:text-white hover:bg-white/[0.05]'
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/[0.04] rounded-xl overflow-hidden">
              <div className="divide-y divide-white/[0.04]">
                {getTabContent(activeTab, property).map((item, index) => (
                  <div key={index} className="px-4 py-3 flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-0.5">{item.label}</p>
                      <p className="text-zinc-500 text-xs">{item.detail}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documents Modal */}
      <DocumentsModal
        property={property}
        open={docsModalOpen}
        onOpenChange={setDocsModalOpen}
        docLabelMap={DOC_LABEL_MAP}
      />
    </section>
  );
}
