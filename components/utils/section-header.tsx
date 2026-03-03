'use client';

import { FadeIn } from '@/components/utils/motion';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <FadeIn className="flex flex-col items-center gap-4 text-center mb-12 md:mb-16">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl text-pretty">
          {subtitle}
        </p>
      )}
      <div className="w-16 h-1 rounded-full bg-blue-500 mt-2" />
    </FadeIn>
  );
}
