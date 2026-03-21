'use client';

import { Property } from '@/lib/propertyData';

interface LocationSectionProps {
  property: Property;
}

function getDefaultHighlights(property: Property): string[] {
  return [
    `${property.tenureType} land within ${property.city} municipal limits`,
    `Part of ${property.assetType.toLowerCase()} development zone`,
    `${property.issuingAuthority} jurisdiction — regulated growth corridor`,
  ];
}

export function LocationSection({ property }: LocationSectionProps) {
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${property.siteLng - 0.02}%2C${property.siteLat - 0.015}%2C${property.siteLng + 0.02}%2C${property.siteLat + 0.015}&layer=mapnik&marker=${property.siteLat}%2C${property.siteLng}`;

  const highlights = property.locationHighlights && property.locationHighlights.length > 0
    ? property.locationHighlights
    : getDefaultHighlights(property);

  return (
    <section className="py-10 border-t border-white/[0.06]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-medium">Location</h2>
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
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Map — takes 3 columns */}
        <div className="lg:col-span-3 relative aspect-[4/3] lg:aspect-auto lg:min-h-[280px] rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/[0.06]">
          <iframe
            src={mapSrc}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer"
            title={`Map of ${property.locality}, ${property.city}`}
            style={{ filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.7)' }}
          />
        </div>

        {/* Strategic context — takes 2 columns */}
        <div className="lg:col-span-2 flex flex-col">
          <p className="text-zinc-400 text-sm mb-4">
            {property.locality}, {property.city} &middot; {property.sizeSqm.toLocaleString()} sqm
          </p>

          <div className="space-y-3 flex-1">
            {highlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-1.5 w-1 h-1 rounded-full bg-gold/60 flex-shrink-0" />
                <p className="text-zinc-300 text-sm leading-snug">{highlight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
