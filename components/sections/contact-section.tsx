'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/utils/section-header';
import { FadeIn } from '@/components/utils/motion';
import { Icon, IconName } from '@/components/icons/icon';
import { siteConfig } from '@/config/site';
import { openUrl } from '@/config/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { sendEmail } from '@/actions/email';
import { Button } from '@/components/ui/button';
import { TooltipHover } from '@/components/utils/tooltip';

interface ContactInfo {
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}

export default function ContactSection() {
  const t = useTranslations('Contact');

  const [isPending, setIsPending] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: '' });

  const contactInfo: ContactInfo[] = [
    {
      icon: 'mail',
      label: t('info.email'),
      value: siteConfig.links.email,
      href: `mailto:${siteConfig.links.email}`,
    },
    {
      icon: 'location',
      label: t('info.location'),
      value: t('info.locationValue'),
    },
  ];

  const socialLinks = [
    { icon: 'github' as IconName, href: siteConfig.links.github, label: 'GitHub' },
    { icon: 'linkedin' as IconName, href: siteConfig.links.linkedin, label: 'LinkedIn' },
    { icon: 'instagram' as IconName, href: siteConfig.links.instagram, label: 'Instagram' },
    { icon: 'telegram' as IconName, href: siteConfig.links.telegram, label: 'Telegram' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    setFeedback({ type: null, message: '' });

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const subject = formData.get('subject') as string;
    const message = formData.get('message') as string;

    const clientTimeout = setTimeout(() => {
      setIsPending(false);
      setFeedback({ type: 'error', message: t('form.timeout') || 'Request timed out. Please try again.' });
    }, 15000);

    try {
      const result = await sendEmail(email, name, subject, message);
      clearTimeout(clientTimeout);

      if (result?.success) {
        setFeedback({ type: 'success', message: t('form.success') });
        (e.target as HTMLFormElement).reset();
      } else {
        setFeedback({ type: 'error', message: result?.message || t('form.error') });
      }
    } catch {
      clearTimeout(clientTimeout);
      setFeedback({ type: 'error', message: t('form.error') });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section id='contact' className='py-20 md:py-28 px-4 bg-muted/30'>
      <div className='max-w-5xl mx-auto'>
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className='flex flex-col lg:flex-row gap-10 lg:gap-16'>
          <FadeIn direction='left' className='flex-1'>
            <div className='flex flex-col gap-6'>
              {contactInfo.map((info, i) => (
                <div
                  key={i}
                  className='flex items-start gap-4 p-4 rounded-2xl border border-border bg-card hover:border-blue-500/30 hover:shadow-md transition-all duration-300 cursor-default'
                  onClick={() => info.href && openUrl(info.href)}
                  role={info.href ? 'link' : undefined}
                >
                  <div className='w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0'>
                    <Icon name={info.icon} className='text-blue-500 text-lg' />
                  </div>
                  <div>
                    <p className='text-sm text-muted-foreground'>{info.label}</p>
                    <p className='text-foreground font-medium text-sm md:text-base break-all'>
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className='mt-8'>
                <p className='text-sm text-muted-foreground mb-4'>{t('or')}</p>
                <div className='flex gap-3'>
                  {socialLinks.map((link, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      onClick={() => openUrl(link.href)}
                      className='w-11 h-11 rounded-xl border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-blue-500 hover:border-blue-500/30 transition-colors duration-300 cursor-pointer'
                      aria-label={link.label}
                    >
                      <Icon name={link.icon} className='text-lg' />
                    </motion.button>
                  ))}
                </div>
              </div>
            </FadeIn>
          </FadeIn>

          <FadeIn direction='right' className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div className='flex flex-col gap-1.5'>
                <input
                  name='name'
                  type='text'
                  required
                  placeholder={t('form.name')}
                  className='w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300'
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <input
                  name='email'
                  type='email'
                  required
                  placeholder={t('form.email')}
                  className='w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300'
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <input
                  name='subject'
                  type='text'
                  required
                  placeholder={t('form.subject')}
                  className='w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300'
                />
              </div>
              <div className='flex flex-col gap-1.5'>
                <textarea
                  name='message'
                  required
                  rows={5}
                  placeholder={t('form.message')}
                  className='w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all duration-300 resize-none'
                />
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type='submit'
                  disabled={isPending}
                  className='w-full py-3 rounded-xl bg-blue-500 text-white font-semibold text-sm hover:bg-blue-600 transition-colors duration-300 flex items-center justify-center gap-2 cursor-pointer'
                >
                  <Icon name={isPending ? 'loader' : 'send'} className={`text-sm ${isPending ? 'animate-spin' : ''}`} />
                  {isPending ? t('form.sending') : t('form.send')}
                </motion.button>
                
                <TooltipHover text={t('clear') || 'Clear form'}>
                  <Button variant='outline' className='h-auto rounded-xl cursor-pointer' type='reset'>
                      <Icon name='clear' />
                  </Button>
                </TooltipHover>
              </div>

              {/* Mensagem de Feedback */}
              {feedback.message && (
                <p className={`text-sm text-center mt-2 ${feedback.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {feedback.message}
                </p>
              )}
            </form>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
