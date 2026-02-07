import createNextIntlPlugin from 'next-intl/plugin';

// Cria o plugin. Por padrão ele procura por './i18n/request.ts'
// Como sua pasta 'i18n' está na raiz (vejo isso na sua imagem), vai funcionar direto.
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Outras configurações do Next.js viriam aqui
};

export default withNextIntl(nextConfig);
