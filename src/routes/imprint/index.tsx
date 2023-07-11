import { component$ } from "@builder.io/qwik";
import styles from "./imprint.module.css";

export default component$(() => {
  return (
    <>
      <div class="container container-center">
        <h1>Imprint</h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        <h2 class={styles.heading}>
          Information provided according to sec. 5 German Telemedia Act (TMG)
        </h2>

        <p class={styles.paragraph}>
          smapiot GmbH
          <br />
          Weidenstrasse 14a
          <br />
          85662 Hohenbrunn
          <br />
          Germany
        </p>

        <h2 class={styles.heading}>Contact</h2>

        <p class={styles.paragraph}>
          Telephone:+49 (0) 8102 9998476
          <br />
          Fax: +49 (0) 8102 9984395
          <br />
          E-Mail: info@smapiot.com
        </p>

        <h2 class={styles.heading}>Represented by</h2>

        <p class={styles.paragraph}>Lothar Schöttner</p>

        <h2 class={styles.heading}>Register entry</h2>

        <p class={styles.paragraph}>
          Registering court: District Court Munich
          <br />
          Registration number: HRB 214798
        </p>

        <h2 class={styles.heading}>VAT number</h2>

        <p class={styles.paragraph}>
          VAT ID number according to sec. 27a German Value Added Tax Act:
          <br />
          DE297589818
        </p>

        <h2 class={styles.heading}>
          Information reg. Professional Indemnity Insurance
        </h2>

        <p class={styles.paragraph}>
          Name and residence of insurer:
          <br />
          Allianz Versicherungs-AG
          <br />
          10900 Berlin
          <br />
          Scope of insurance: Worldwide with exception of US and Canada
        </p>
      </div>
    </>
  );
});
