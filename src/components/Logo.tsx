'use client';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

export function Logo({ className = '', variant = 'dark' }: LogoProps) {
  const textColor = variant === 'dark' ? '#FFFFFF' : '#1a1a1a';
  const goldColor = '#C9A962'; // Match theme gold

  return (
    <svg
      viewBox="0 0 256 48"
      className={className}
      aria-label="Prophit Logo"
      fill="none"
    >
      {/* P */}
      <text
        x="-2"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        P
      </text>

      {/* Golden Devanagari र (ra) */}
      <text
        x="22.5"
        y="36"
        fontFamily="var(--font-devanagari), 'Noto Sans Devanagari', 'Mangal', sans-serif"
        fontWeight="700"
        fontSize="35"
        fill={goldColor}
      >
        र
      </text>

      {/* O */}
      <text
        x="39.5"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        O
      </text>

      {/* P */}
      <text
        x="65"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        P
      </text>

      {/* H */}
      <text
        x="88"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        H
      </text>

      {/* I */}
      <text
        x="114"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        I
      </text>

      {/* T */}
      <text
        x="126"
        y="36"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        fill={textColor}
      >
        T
      </text>

      {/* Growth Arrows */}
      <g transform="translate(154, 4)">
        {/* Left column — white */}
        <path d="M12 26 L0 34 L5 34 L12 29 L19 34 L24 34 Z" fill={textColor} />
        <path d="M12 16 L0 24 L5 24 L12 19 L19 24 L24 24 Z" fill={textColor} />
        {/* Right column — gold */}
        <path d="M34 6 L22 14 L27 14 L34 9 L41 14 L46 14 Z" fill={goldColor} />
        <path d="M34 -4 L22 4 L27 4 L34 -1 L41 4 L46 4 Z" fill={goldColor} />
      </g>
    </svg>
  );
}

// Simplified Logo Icon for smaller sizes
export function LogoIcon({ className = '' }: { className?: string }) {
  const goldColor = '#C9A962';

  return (
    <svg
      viewBox="0 0 50 40"
      className={className}
      aria-label="Prophit"
      fill="none"
    >
      {/* P */}
      <text
        x="2"
        y="28"
        fontFamily="'Inter', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#FFFFFF"
      >
        P
      </text>
      {/* Golden Devanagari र (ra) - scaled */}
      <text
        x="18"
        y="28"
        fontFamily="var(--font-devanagari), 'Noto Sans Devanagari', 'Mangal', sans-serif"
        fontWeight="700"
        fontSize="24"
        fill={goldColor}
      >
        र
      </text>
    </svg>
  );
}
