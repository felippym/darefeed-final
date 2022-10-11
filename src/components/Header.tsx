import ignitelogo from "../assets/Ignite-logo.svg";
import styles from "./Header.module.css";
export function Header() {
  return (
    <header className={styles.header}>
      <img src={ignitelogo} alt="logo darefeed" />
      <strong>Dare.Feed</strong>
    </header>
  );
}
