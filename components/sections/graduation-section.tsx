'use client';

import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/utils/section-header';
import { StaggerContainer, StaggerItem } from '@/components/utils/motion';
import { Icon } from '@/components/icons/icon';
import { Button } from '@/components/ui/button';
import { downloadFile, openUrl } from '@/config/utils';

interface GraduationItem {
  degree: string;
  institution: string;
  period: string;
  description: string;
  type: 'degree' | 'certificate';
  typeName: 'graduação' | 'certificado';
  driveUrl?: string;
  externalUrl?: string;
}

export default function GraduationSection() {
  const t = useTranslations('Graduation');
  const items = t.raw('items') as GraduationItem[];

  return (
    <section id="graduation" className="py-20 md:py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6" staggerDelay={0.15}>
          {items.map((item, i) => (
            <StaggerItem key={i}>
              <div className="group relative h-full p-5 md:p-6 rounded-2xl border border-border bg-card hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                    <Icon
                      name={item.type === 'degree' ? 'graduation' : 'certificate'}
                      className="text-blue-500 text-lg"
                    />
                  </div>
                  <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20 capitalize">
                    {item.typeName}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{item.degree}</h3>

                <p className="flex items-center gap-1.5 text-sm text-blue-500 font-medium mb-2">
                  <Icon name="building" className="text-xs" />
                  {item.institution}
                </p>

                <p className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3">
                  <Icon name="calendar" className="text-xs" />
                  {item.period}
                </p>

                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Exibe botões de download e exibição, caso tenha links */}
                <div className='mt-3 grid grid-cols-2 gap-2 w-full'>

                    {(item.driveUrl || item.externalUrl) && (<>

                        {item.driveUrl &&
                            <Button 
                                variant='secondary' 
                                className='w-full cursor-pointer' 
                                type='button' 
                                onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        downloadFile(item.driveUrl as string);
                                    }}
                            > 
                                <Icon name='download' /> {t('downloadText')}
                            </Button>
                        }

                        <Button 
                            variant='outline' 
                            className='w-full cursor-pointer'
                            onClick={() => openUrl((item.externalUrl ? item.externalUrl : item.driveUrl) as string)}
                        > 
                            <Icon name='view' /> {t('viewText')} 
                        </Button>
                    </>) || (
                        <Button 
                            variant='secondary' 
                            disabled
                            className='col-span-2 w-full cursor-pointer' 
                            type='button' 
                        > 
                            <Icon name='soon' /> {t('soon')}
                        </Button>
                    )}

                </div>

              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
