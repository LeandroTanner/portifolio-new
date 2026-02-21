/**
 * Navega suavemente até uma seção da página pelo ID.
 */
export const scrollTo = (id: string): void => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

/**
 * Abre uma URL em uma nova aba.
 */
export const openUrl = (url: string): void => {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Converte um link de visualização do Google Drive em um link de download direto
 * e força o download no navegador do usuário.
 */
export const downloadFile = (driveUrl: string, fileName: string = 'curriculum.pdf'): void => {
  if (!driveUrl) return;

  // Regex para capturar o ID do arquivo no meio da URL do Drive
  const match = driveUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
  
  if (match && match[1]) {
    const fileId = match[1];
    // URL oficial de download direto do Google Drive
    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
    
    // Elemento <a> temporário para forçar a ação de download
    const link = document.createElement('a');
    link.href = directDownloadUrl;
    link.download = fileName; 

    link.target = '_blank';

    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
    }, 10);
  } else {
    console.error('URL do Google Drive inválida. Certifique-se de que contém /d/ID_DO_ARQUIVO');
    // Fallback
    openUrl(driveUrl);
  }
};