'use client';

interface NavSection {
  id: string;
  label: string;
}

interface AnchorNavProps {
  sections: NavSection[];
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function AnchorNav({ sections, activeSection, onNavigate }: AnchorNavProps) {
  return (
    <nav className="sticky top-16 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => onNavigate(section.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-all duration-300 ${
                activeSection === section.id
                  ? 'bg-gold/10 text-gold'
                  : 'text-zinc-500 hover:text-white hover:bg-white/[0.03]'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
