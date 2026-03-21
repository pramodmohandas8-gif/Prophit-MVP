"use client";

import { Children, type ReactNode } from "react";

interface DeckContainerProps {
  children: ReactNode;
}

export function DeckContainer({ children }: DeckContainerProps) {
  const slides = Children.toArray(children);

  return (
    <div style={{ backgroundColor: "#050505" }}>
      {slides.map((slide, i) => (
        <section key={i} className="h-screen w-full">
          {slide}
        </section>
      ))}
    </div>
  );
}
