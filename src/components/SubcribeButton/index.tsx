import { useSession, signin } from "next-auth/client";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

type SubscriptionProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscriptionProps) {
  const [session] = useSession();

  async function handleSubscribe() {
    //verifica se está logado
    if (!session) {
      signin("github");
      return;
    }

    //cria o checkout session
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribe}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
