'use server'; 

import { isValidString } from '@/config/formatters';
import { siteConfig } from '@/config/site';
import { getTranslations } from 'next-intl/server'; 
import { Resend } from 'resend';

const TIMEOUT_MS = 10000;

export const sendEmail = async (emailFrom: string, name: string, subject: string, content: string) => {
    const t = await getTranslations('Email');
    
    const apiKey = process.env.RESEND_API_KEY;
    const templateId = process.env.RESEND_TEMPLATE_ID;
    
    if (!apiKey || !isValidString(apiKey)) {
        return {
            success: false,
            message: t('configError') || 'Email service not configured. Please contact the administrator.',
            error: 'RESEND_API_KEY is not set'
        };
    }
    
    if (!templateId || !isValidString(templateId)) {
        return {
            success: false,
            message: t('configError') || 'Email template not configured. Please contact the administrator.',
            error: 'RESEND_TEMPLATE_ID is not set'
        };
    }
    
    try {
        const emailTo = siteConfig.links.email;
        
        if (!isValidString(emailTo) || !isValidString(name) || !isValidString(subject) || !isValidString(content)){
            return {
                success: false,
                message: t('invalid'),
            };
        }

        const resend = new Resend(apiKey);
        
        const sendPromise = resend.emails.send({
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
        
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), TIMEOUT_MS);
        });
        
        await Promise.race([sendPromise, timeoutPromise]);

        return { success: true, message: t('success') };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        
        if (errorMessage === 'Request timeout') {
            return {
                success: false,
                message: t('timeout') || 'Request timed out. Please try again.',
                error: errorMessage
            };
        }
        
        return {
            success: false,
            message: t('error'),
            error: errorMessage
        };
    }
}
