'use client';

import { useTranslations } from 'next-intl';
import { Icon, IconName } from '@/components/icons/icon';
import { siteConfig } from '@/config/site';
import { openUrl, scrollTo } from '@/config/utils';
import { TooltipHover } from '@/components/utils/tooltip';

export default function Footer() {
  const t = useTranslations('Footer');
  const nav = useTranslations('Nav.items');

  const socialLinks: { icon: IconName; href: string; label: string }[] = [
    { icon: 'github', href: siteConfig.links.github, label: 'GitHub' },
    { icon: 'linkedin', href: siteConfig.links.linkedin, label: 'LinkedIn' },
    { icon: 'instagram', href: siteConfig.links.instagram, label: 'Instagram' },
    { icon: 'telegram', href: siteConfig.links.telegram, label: 'Telegram' },
  ];

  const navLinks = [
    { label: nav('home'), key: 'hero' },
    { label: nav('about'), key: 'about' },
    { label: nav('xp'), key: 'experience' },
    { label: nav('graduation'), key: 'graduation' },
    { label: nav('projects'), key: 'projects' },
    { label: nav('contact'), key: 'contact' },
  ];

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 mb-10 md:mb-12">
          <div className="flex flex-col gap-4 md:max-w-xs">
            <span className="text-lg font-bold text-foreground">
              ltanner<span className="text-blue-500">.dev</span>
            </span>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer
            </p>
            <div className="flex gap-2.5">
              {socialLinks.map((link, i) => (
                  <button
                      key={i}
                      onClick={() => openUrl(link.href)}
                      className="w-9 h-9 rounded-lg border border-border flex items-center justify-center     text-muted-foreground hover:text-blue-500 hover:border-blue-500/30 transition-all duration-300  cursor-pointer"
                      aria-label={link.label}
                  >
                      <Icon name={link.icon} className="text-sm" />
                  </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {nav('home')}
            </h4>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(link.key)}
                  className="text-sm text-muted-foreground hover:text-blue-500 transition-colors duration-300 text-left cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              {nav('contact')}
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={`mailto:${siteConfig.links.email}`}
                className="text-sm text-muted-foreground hover:text-blue-500 transition-colors duration-300"
              >
                {siteConfig.links.email}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 md:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. {t('rights')}
          </p>
          <p className="text-xs text-muted-foreground">
            {t('madeWith')} <Icon name="heart" className="text-blue-500 text-xs inline" /> {t('and')} <Icon name="code" className="text-blue-500 text-xs inline" /> {t('by')} {siteConfig.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
