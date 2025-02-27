
import { useState, useEffect } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Loader2 } from 'lucide-react';
import { Json } from '@/integrations/supabase/types';

interface PaymentFormProps {
  clientSecret: string;
  orderId: string;
}

type TimelineEvent = {
  status: string;
  timestamp: string;
  message?: string | null;
}

interface OrderStatus {
  status: string;
  errorMessage?: string;
}

const useOrderStatus = (orderId: string) => {
  const updateStatus = async ({ status, errorMessage }: OrderStatus) => {
    // Créer un objet qui correspond exactement au type Json attendu
    const timelineEvent: Record<string, string | null> = {
      status,
      timestamp: new Date().toISOString(),
      message: errorMessage || null
    };

    const { data: currentOrder } = await supabase
      .from('orders')
      .select('status_timeline')
      .eq('id', orderId)
      .single();

    // Assurez-vous que le tableau existe et est du bon type
    const currentTimeline = (currentOrder?.status_timeline as Json[]) || [];
    const updatedTimeline = [...currentTimeline, timelineEvent];

    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        error_message: errorMessage || null,
        status_timeline: updatedTimeline
      })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
      return;
    }

    // Si le statut est "completed", envoyer l'email de confirmation
    if (status === 'completed') {
      try {
        const response = await fetch('/api/send-order-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`
          },
          body: JSON.stringify({ orderId })
        });

        if (!response.ok) {
          throw new Error('Failed to send confirmation email');
        }
      } catch (error) {
        console.error('Error sending confirmation email:', error);
        // On ne bloque pas le processus si l'email échoue
      }
    }
  };

  return { updateStatus };
};

const PaymentForm = ({ clientSecret, orderId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { clearCart } = useCart();
  const { updateStatus } = useOrderStatus(orderId);

  useEffect(() => {
    if (isProcessing) {
      const timeoutId = setTimeout(() => {
        setIsProcessing(false);
        setErrorMessage("Le délai de paiement a expiré. Veuillez réessayer.");
        updateStatus({ 
          status: 'failed', 
          errorMessage: "Délai de paiement expiré" 
        });
      }, 60000);

      return () => clearTimeout(timeoutId);
    }
  }, [isProcessing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(undefined);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders/${orderId}?success=true`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
        await updateStatus({ 
          status: 'failed', 
          errorMessage: error.message 
        });
        toast({
          title: "Erreur de paiement",
          description: error.message,
          variant: "destructive",
        });
      } else {
        await updateStatus({ status: 'completed' });
        clearCart();
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage("Une erreur inattendue est survenue");
      await updateStatus({ 
        status: 'failed', 
        errorMessage: "Erreur système lors du paiement" 
      });
      toast({
        title: "Erreur de paiement",
        description: "Une erreur est survenue lors du paiement",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">
          {errorMessage}
        </div>
      )}
      
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <span className="flex items-center space-x-2">
            <Loader2 className="animate-spin h-4 w-4" />
            <span>Traitement en cours...</span>
          </span>
        ) : (
          "Payer"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
