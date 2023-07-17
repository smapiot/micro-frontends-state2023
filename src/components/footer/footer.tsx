import { component$ } from "@builder.io/qwik";
import styles from "./footer.module.css";
import { Link } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <footer>
      <div class={['container', styles.anchor]}>
        <span>Made with ❤️ by smapiot</span>
        <span class={styles.spacer}>|</span>
        <Link href="/imprint">Imprint</Link>
        <span class={[styles.spacer, styles.sep]}>|</span>
        <Link href="/disclaimer">Disclaimer</Link>
        <span class={[styles.spacer, styles.sep]}>|</span>
        <Link href="/privacy">Privacy</Link>
      </div>
    </footer>
  );
});
