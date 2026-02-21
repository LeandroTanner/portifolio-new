import { useTranslations } from 'next-intl';

// Hook personalizado para obter uma tradução como um array de strings
export const useRawArray = (key: string) => {
  const t = useTranslations();
  return t.raw(key) as string[];
}

export const isValidString = (str?: string | null) => {
    return !!str && str.trim().length > 0 && str !== 'undefined' && str !== 'null';
}