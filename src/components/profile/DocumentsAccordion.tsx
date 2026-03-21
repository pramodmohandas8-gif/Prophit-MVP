'use client';

import { useEffect, useState } from 'react';
import { getPropertyById } from '@/lib/propertyData';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

interface PropertyDocuments {
  propertyId: string;
  propertyName: string;
  documents: Document[];
}

// Get documents grouped by property
function getPropertyDocuments(): PropertyDocuments[] {
  if (typeof window === 'undefined') return [];

  const transactionState = localStorage.getItem('prophit_transaction_state');
  if (!transactionState) return [];

  try {
    const state = JSON.parse(transactionState);
    if (state.status === 'completed' && state.propertyId) {
      const property = getPropertyById(state.propertyId);
      if (!property) return [];

      // Mock documents for completed participation
      return [
        {
          propertyId: state.propertyId,
          propertyName: property.title,
          documents: [
            {
              id: 'llp-agreement',
              name: 'LLP Agreement',
              type: 'PDF',
              size: '2.4 MB',
              date: new Date().toISOString(),
            },
            {
              id: 'allotment-letter',
              name: 'Allotment Letter',
              type: 'PDF',
              size: '856 KB',
              date: new Date().toISOString(),
            },
            {
              id: 'payment-receipt',
              name: 'Payment Receipt',
              type: 'PDF',
              size: '124 KB',
              date: new Date().toISOString(),
            },
            {
              id: 'tax-statement',
              name: 'Tax Statement',
              type: 'PDF',
              size: '312 KB',
              date: new Date().toISOString(),
            },
          ],
        },
      ];
    }
  } catch {
    // Invalid state
  }

  return [];
}

export function DocumentsAccordion() {
  const [propertyDocuments, setPropertyDocuments] = useState<PropertyDocuments[]>([]);
  const [expandedProperty, setExpandedProperty] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const docs = getPropertyDocuments();
    setPropertyDocuments(docs);
    // Auto-expand first property if exists
    if (docs.length > 0) {
      setExpandedProperty(docs[0].propertyId);
    }
  }, []);

  const handleDownload = (e: React.MouseEvent, documentName: string) => {
    e.stopPropagation();
    // In production, trigger actual download
    alert(`Downloading ${documentName}...`);
  };

  if (!mounted) {
    return (
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-zinc-800 rounded w-1/3" />
          <div className="h-16 bg-zinc-800/50 rounded" />
        </div>
      </div>
    );
  }

  if (propertyDocuments.length === 0) {
    return (
      <div className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-zinc-500 text-sm mb-2">No documents available</p>
        <p className="text-zinc-600 text-xs">
          Documents will appear here after you participate in an opportunity
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {propertyDocuments.map((property) => (
        <div
          key={property.propertyId}
          className="bg-[#0c0c0c] border border-white/[0.06] rounded-2xl overflow-hidden"
        >
          {/* Accordion Header */}
          <button
            onClick={() =>
              setExpandedProperty(
                expandedProperty === property.propertyId ? null : property.propertyId
              )
            }
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center">
                <svg className="w-4 h-4 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">{property.propertyName}</p>
                <p className="text-zinc-500 text-xs">{property.documents.length} documents</p>
              </div>
            </div>
            <svg
              className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
                expandedProperty === property.propertyId ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Accordion Content */}
          {expandedProperty === property.propertyId && (
            <div className="border-t border-white/[0.04]">
              {property.documents.map((doc, index) => (
                <div
                  key={doc.id}
                  className={`px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors ${
                    index !== property.documents.length - 1 ? 'border-b border-white/[0.04]' : ''
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800/50 flex items-center justify-center">
                      <svg className="w-4 h-4 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white text-sm">{doc.name}</p>
                      <p className="text-zinc-600 text-xs">{doc.type} · {doc.size}</p>
                    </div>
                  </div>
                  <button
                    onClick={(e) => handleDownload(e, doc.name)}
                    className="p-2 text-zinc-500 hover:text-gold transition-colors rounded-lg hover:bg-white/[0.03]"
                    aria-label={`Download ${doc.name}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
