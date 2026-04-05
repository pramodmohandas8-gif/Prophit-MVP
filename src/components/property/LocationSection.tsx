'use client';

import { useRouter } from 'next/navigation';
import { Property } from '@/lib/propertyData';
import { useSubscription } from '@/context/SubscriptionContext';

interface LocationSectionProps {
  property: Property;
}

const HIGHLIGHT_ICONS: Record<string, JSX.Element> = {
  industrial: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  railway: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h8m-8 4h8m-4 4v4m-4 0h8m-8 0l-2 2m10-2l2 2M6 3h12a1 1 0 011 1v12a3 3 0 01-3 3H8a3 3 0 01-3-3V4a1 1 0 011-1z" />
    </svg>
  ),
  highway: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447 2.724A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
    </svg>
  ),
  education: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
    </svg>
  ),
  growth: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

function getIconForHighlight(text: string): JSX.Element {
  const lower = text.toLowerCase();
  if (lower.includes('industrial') || lower.includes('employment')) return HIGHLIGHT_ICONS.industrial;
  if (lower.includes('railway') || lower.includes('junction') || lower.includes('station')) return HIGHLIGHT_ICONS.railway;
  if (lower.includes('highway') || lower.includes('nh-') || lower.includes('expressway') || lower.includes('road')) return HIGHLIGHT_ICONS.highway;
  if (lower.includes('education') || lower.includes('coaching') || lower.includes('school') || lower.includes('university')) return HIGHLIGHT_ICONS.education;
  if (lower.includes('growth') || lower.includes('appreciation') || lower.includes('upcoming') || lower.includes('corridor')) return HIGHLIGHT_ICONS.growth;
  return HIGHLIGHT_ICONS.industrial;
}

function getDefaultHighlights(property: Property): string[] {
  return [
    `${property.tenureType} land within ${property.city} municipal limits`,
    `Part of ${property.assetType.toLowerCase()} development zone`,
    `${property.issuingAuthority} jurisdiction, regulated growth corridor`,
  ];
}

export function LocationSection({ property }: LocationSectionProps) {
  const { isSubscribed } = useSubscription();
  const router = useRouter();
  const googleMapSrc = `https://maps.google.com/maps?q=${property.siteLat},${property.siteLng}&z=15&output=embed`;

  const highlights = property.locationHighlights && property.locationHighlights.length > 0
    ? property.locationHighlights
    : getDefaultHighlights(property);

  const handleSubscribe = () => {
    localStorage.setItem('prophit_subscribe_return', window.location.pathname);
    router.push('/subscribe');
  };

  return (
    <section className="py-10 border-t border-white/[0.06]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-medium">Location</h2>
        {isSubscribed && (
          <a
            href={`https://www.google.com/maps?q=${property.siteLat},${property.siteLng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 text-xs hover:text-white transition-colors flex items-center gap-1.5"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in Maps
          </a>
        )}
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Google Map — takes 3 columns */}
        <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[280px] rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/[0.06]">
          {isSubscribed ? (
            <iframe
              src={googleMapSrc}
              className="absolute inset-0 w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer"
              allowFullScreen
              title={`Map of ${property.locality}, ${property.city}`}
              style={{ filter: 'brightness(0.75) contrast(1.1) saturate(0)' }}
            />
          ) : (
            /* Gated map for non-subscribers */
            <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0c]">
              {/* Blurred placeholder */}
              <div className="absolute inset-0 opacity-[0.15] blur-sm" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(201,169,98,0.15) 0%, transparent 70%)' }} />
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="text-center px-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium mb-1">Exact location available with Prophit Access</p>
                  <p className="text-zinc-500 text-xs mb-4">{property.city} region</p>
                  <button
                    onClick={handleSubscribe}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, rgba(201, 169, 98, 0.9), rgba(178, 144, 70, 0.9))',
                      color: '#0a0a0a',
                    }}
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Unlock Location
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Strategic context — takes 2 columns */}
        <div className="lg:col-span-2 flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <svg className="w-4 h-4 text-gold/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-zinc-300 text-sm font-medium">
              {isSubscribed ? `${property.locality}, ${property.city}` : property.city}
            </p>
            <span className="text-zinc-600 text-xs ml-auto">{property.sizeSqm.toLocaleString()} sqm</span>
          </div>

          <div className="space-y-1 flex-1">
            {highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-zinc-500 flex-shrink-0">
                  {getIconForHighlight(highlight)}
                </div>
                <p className="text-zinc-400 text-[13px] leading-snug">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
