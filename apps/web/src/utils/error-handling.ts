import { toast } from '@/components/ui/use-toast';

export const handleError = (error: unknown) => {
  console.error('An error occurred:', error);
  
  let message = 'An unexpected error occurred. Please try again.';
  
  if (error instanceof Error) {
    message = error.message;
  }

  toast({
    title: 'Error',
    description: message,
    variant: 'destructive',
  });
};