'use client';

import { Property } from '@/lib/propertyData';

interface DocumentsModalProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  docLabelMap: Record<string, string>;
}

function getDocLabel(filename: string, labelMap: Record<string, string>): string {
  return labelMap[filename] || filename.replace(/[-_]/g, ' ').replace('.pdf', '');
}

export function DocumentsModal({ property, open, onOpenChange, docLabelMap }: DocumentsModalProps) {
  if (!open) return null;

  const hasStructuredDocs = property.documentCategories && property.documentCategories.length > 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative w-full sm:max-w-lg max-h-[85vh] bg-[#0c0c0c] border border-white/[0.08] rounded-t-2xl sm:rounded-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06] flex-shrink-0">
          <div>
            <h3 className="text-white text-base font-medium">Documents &amp; Verification</h3>
            <p className="text-zinc-500 text-xs mt-1">
              Verified through government and regulatory documents
            </p>
          </div>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {hasStructuredDocs ? (
            // Structured document categories
            <div className="space-y-6">
              {property.documentCategories!.map((cat, ci) => (
                <div key={ci}>
                  <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-3">
                    {cat.category}
                  </p>
                  <div className="space-y-2">
                    {cat.documents.map((doc, di) => (
                      <a
                        key={di}
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]
                                   hover:bg-white/[0.05] hover:border-white/[0.08] transition-all group"
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          <svg className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-zinc-200 text-sm font-medium leading-tight">{doc.title}</p>
                          <p className="text-zinc-500 text-xs mt-0.5">{doc.description}</p>
                        </div>
                        <div className="flex-shrink-0 mt-0.5">
                          <span className="text-zinc-500 text-xs group-hover:text-gold transition-colors">
                            View
                          </span>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Flat document list (fallback for legacy listings)
            <div>
              <p className="text-zinc-400 text-xs font-medium uppercase tracking-wider mb-3">
                Available Documents
              </p>
              <div className="space-y-2">
                {property.docs.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.04]
                               hover:bg-white/[0.05] transition-colors"
                  >
                    <svg className="w-4 h-4 text-zinc-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-zinc-300 text-sm">{getDocLabel(doc, docLabelMap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
