import styles from "./styles.module.scss";

type SubscriptionProps = {
  priceId: string;
};

export function SubscribeButton({ priceId }: SubscriptionProps) {
  return (
    <button type="button" className={styles.subscribe}>
      Subscribe now
    </button>
  );
}
