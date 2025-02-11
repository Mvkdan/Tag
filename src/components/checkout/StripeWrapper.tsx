
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Remplacez par votre clé publique Stripe
const stripePromise = loadStripe('pk_test_51OShrFGRWWJyqG6Z2uLwp95B0svVmMXjwKm6JRi2yPiPLHYOvXDQKIFfPwKcEe3HFB6sT46y6MLCU7ZOQXNt7L9300Mba5qK2p');

interface StripeWrapperProps {
  clientSecret: string;
  orderId: string;
}

const StripeWrapper = ({ clientSecret, orderId }: StripeWrapperProps) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <PaymentForm clientSecret={clientSecret} orderId={orderId} />
    </Elements>
  );
};

export default StripeWrapper;
