import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/icons/icon';
import { siteConfig } from '@/config/site';
import { downloadFile, openUrl } from '@/config/utils';

interface CvDialogProps {
  children: React.ReactNode;
  title: string;
  text_download: string;
  text_view: string;
  description: string;
}


export function CvDialog({ children, title, text_download, text_view, description }: CvDialogProps) {
  const cvUrl = siteConfig.links.cvUrl;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle> {title} </AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='md:gap-2 md:flex md:flex-col-reverse md:flex-wrap-reverse'>
          <AlertDialogCancel className='cursor-pointer md:w-full'> <Icon name='close' /> </AlertDialogCancel>
          <div className='grid grid-cols-2 gap-2 w-full'>
            <Button 
              variant='default' 
              className='w-full cursor-pointer' 
              type='button' 
              onClick={
                (e) => {
                e.stopPropagation();
                downloadFile(cvUrl);
              }}> 
                <Icon name='download' /> {text_download}
            </Button>
            
            <Button variant='default' className='w-full cursor-pointer' onClick={() => openUrl(cvUrl)}> 
              <Icon name='view' /> {text_view} 
            </Button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
