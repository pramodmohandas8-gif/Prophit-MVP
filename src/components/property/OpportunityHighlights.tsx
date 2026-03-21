'use client';

import { Property } from '@/lib/propertyData';

interface OpportunityHighlightsProps {
  property: Property;
}

interface Highlight {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Generate highlights based on property data
function getHighlights(property: Property): Highlight[] {
  const highlights: Highlight[] = [];

  // Growth highlight
  if (property.growthPercent > 0) {
    highlights.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: `+${property.growthPercent}% Area Growth`,
      description: `Over ${property.growthPeriodYears} years based on market data`,
    });
  }

  // Exit type specific highlights
  if (property.exitType === 'Developer Buyback' && property.buybackClausePresent) {
    highlights.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Buyback Window',
      description: 'Developer committed repurchase clause',
    });
  }

  // Authority/Government highlight
  if (property.exitType.includes('Government') || property.issuingAuthority) {
    highlights.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: 'Authority Backed',
      description: `Issued by ${property.issuingAuthority}`,
    });
  }

  // Infrastructure highlight
  highlights.push({
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Strategic Location',
    description: `${property.locality}, ${property.city}`,
  });

  // Escrow highlight
  if (property.escrowAmountInr > 0) {
    highlights.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      title: 'Escrow Protected',
      description: `Funds secured via ${property.escrowBankName}`,
    });
  }

  // Size highlight
  highlights.push({
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ),
    title: `${property.sizeSqm.toLocaleString()} sqm`,
    description: `${property.tenureType} ownership`,
  });

  // RERA highlight
  if (property.reraNumber) {
    highlights.push({
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'RERA Registered',
      description: 'Compliant with regulations',
    });
  }

  return highlights.slice(0, 6); // Max 6 highlights
}

export function OpportunityHighlights({ property }: OpportunityHighlightsProps) {
  const highlights = getHighlights(property);

  return (
    <section className="py-10">
      <h2 className="text-white text-lg font-medium mb-6">Why This Opportunity</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="bg-[#0c0c0c] border border-white/[0.06] rounded-xl p-5 hover:border-gold/20 transition-colors"
          >
            <div className="text-gold mb-3">
              {highlight.icon}
            </div>
            <h3 className="text-white text-sm font-medium mb-1">
              {highlight.title}
            </h3>
            <p className="text-zinc-500 text-xs leading-relaxed">
              {highlight.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
