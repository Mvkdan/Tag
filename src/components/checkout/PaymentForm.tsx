
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

interface TimelineEvent {
  status: string;
  timestamp: string;
  message?: string;
}

const PaymentForm = ({ clientSecret, orderId }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { clearCart } = useCart();

  // Gérer le timeout du paiement
  useEffect(() => {
    if (isProcessing) {
      const timeoutId = setTimeout(() => {
        setIsProcessing(false);
        setErrorMessage("Le délai de paiement a expiré. Veuillez réessayer.");
        updateOrderStatus('failed', "Délai de paiement expiré");
      }, 60000); // 1 minute timeout

      return () => clearTimeout(timeoutId);
    }
  }, [isProcessing]);

  const updateOrderStatus = async (status: string, errorMsg?: string) => {
    const newTimelineEvent: TimelineEvent = {
      status,
      timestamp: new Date().toISOString(),
      message: errorMsg
    };

    // Récupérer d'abord l'historique actuel
    const { data: currentOrder } = await supabase
      .from('orders')
      .select('status_timeline')
      .eq('id', orderId)
      .single();

    const updatedTimeline: Json[] = [
      ...(currentOrder?.status_timeline as Json[] || []),
      newTimelineEvent as Json
    ];

    const { error } = await supabase
      .from('orders')
      .update({ 
        status,
        error_message: errorMsg,
        status_timeline: updatedTimeline
      })
      .eq('id', orderId);

    if (error) {
      console.error('Error updating order status:', error);
    }
  };

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
        await updateOrderStatus('failed', error.message);
        toast({
          title: "Erreur de paiement",
          description: error.message,
          variant: "destructive",
        });
      } else {
        // Si pas d'erreur, le paiement est en cours de traitement
        await updateOrderStatus('processing');
        clearCart();
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setErrorMessage("Une erreur inattendue est survenue");
      await updateOrderStatus('failed', "Erreur système lors du paiement");
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
