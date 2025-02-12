
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface StripeWrapperProps {
  sessionUrl: string;
  orderId: string;
}

const StripeWrapper = ({ sessionUrl }: StripeWrapperProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to Stripe Checkout
    if (sessionUrl) {
      window.location.href = sessionUrl;
    } else {
      toast({
        title: "Erreur",
        description: "Impossible de rediriger vers la page de paiement",
        variant: "destructive",
      });
      navigate('/checkout');
    }
  }, [sessionUrl, navigate]);

  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <p className="text-lg">Redirection vers la page de paiement...</p>
        <p className="text-sm text-gray-500 mt-2">Vous allez être redirigé vers une page sécurisée pour finaliser votre paiement.</p>
      </div>
    </div>
  );
};

export default StripeWrapper;
