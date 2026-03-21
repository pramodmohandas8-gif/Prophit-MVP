export default function DeckLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Suppress all retail decorative elements from root layout */}
      <style>{`
        .aurora-ambient,
        .grid-background,
        .noise-overlay,
        .luxury-particles,
        .prestige-toggle,
        .feedback-widget { display: none !important; }
        .luxury-watermark { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
