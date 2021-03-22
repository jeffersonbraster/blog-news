import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserLogegrIn = true;

  return isUserLogegrIn ? (
    <button className={styles.SignInButton} type="button">
      <FaGithub color="#04d301" />
      Jefferson Brandão
      <FiX color="#737380" className={styles.closeIcon} />
    </button>
  ) : (
    <button className={styles.SignInButton} type="button">
      <FaGithub color="#eba417" />
      Sign in with Github
    </button>
  );
}
