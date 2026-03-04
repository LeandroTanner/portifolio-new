import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Usa as imagens em avif e webp para otimizar o carregamento
  images: {
    formats: ['image/avif', 'image/webp'],
  }
};

export default withNextIntl(nextConfig);