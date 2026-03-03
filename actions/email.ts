'use server'; 

import { isValidString } from '@/config/formatters';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const templateId = process.env.RESEND_TEMPLATE_ID as string;
const resend = new Resend(apiKey);

const email = useTranslations('Email');

export const sendEmail = async (emailFrom: string, name: string, subject: string, content: string) => {
    try {
        const emailTo = siteConfig.links.email;
        
        if (!isValidString(emailTo) || !isValidString(name) || !isValidString(subject) || !isValidString(content)){
            return {
                success: false,
                message: 'Parâmetros de envio inválidos. Certifique-se de que tudo esteja preenchido.',
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

        return { success: true, message: 'Mensagem enviada com sucesso!' };
    }
    catch (error) {
        return {
            success: false,
            message: 'Falha ao enviar o e-mail.',
            error: error instanceof Error ? error.message : 'Erro desconhecido'
        };
    }
}