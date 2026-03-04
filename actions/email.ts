'use server'; 

import { isValidString } from '@/config/formatters';
import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server'; 
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const templateId = process.env.RESEND_TEMPLATE_ID as string;
const resend = new Resend(apiKey);



export const sendEmail = async (emailFrom: string, name: string, subject: string, content: string) => {
    const t = await getTranslations('Email');
    
    try {
        const emailTo = siteConfig.links.email;
        
        if (!isValidString(emailTo) || !isValidString(name) || !isValidString(subject) || !isValidString(content)){
            return {
                success: false,
                message: t('invalid'),
            };
        }

        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', 
            to: emailTo,
            subject: `Contato via site - ${subject}`,
            template: {
                id: templateId,
                variables: {
                    SENDER_NAME: name,
                    SENDER_EMAIL: emailFrom,
                    MESSAGE_TEXT: content,
                }
            }
        });

        return { success: true, message: t('success') };
    }
    catch (error) {
        return {
            success: false,
            message: t('error'),
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}