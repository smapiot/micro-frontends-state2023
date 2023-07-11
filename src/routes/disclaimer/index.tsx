import { component$ } from "@builder.io/qwik";
import styles from "./disclaimer.module.css";

export default component$(() => {
  return (
    <>
      <div class="container container-center">
        <h1>Legal Disclaimer</h1>
      </div>

      <div role="presentation" class="ellipsis"></div>

      <div class="container container-center">
        <h2 class={styles.heading}>Liability for Contents</h2>

        <p class={styles.paragraph}>
          The contents of our pages have been compiled with the greatest care.
          However, we cannot guarantee for accuracy, completeness or topicality
          of the contents. As service providers, we are liable for own contents
          of these websites according to sec. 7, paragraph 1 German Telemedia
          Act (TMG). However, according to sec. 8 to 10 German Telemedia Act
          (TMG), service providers are not obligated to permanently monitor
          submitted or stored information or to search for evidences that
          indicate illegal activities. Legal obligations to removing information
          or to blocking the use of information remain unchallenged. In this
          case, liability is only possible at the time of knowledge about a
          specific violation of law. Illegal contents will be removed
          immediately at the time we get knowledge of them.
        </p>

        <h2 class={styles.heading}>Liability for Links</h2>

        <p class={styles.paragraph}>
          Our web pages include links to external third party websites. We have
          no influence on the contents of those external websites, therefore we
          cannot guarantee for those contents. Providers or administrators of
          linked websites are always responsible for their own contents. The
          linked websites had been checked for possible violations of law at the
          time of the establishment of the link. Illegal contents were not
          detected at the time of the linking. A permanent monitoring of the
          contents of linked websites cannot be imposed without reasonable
          indications that there has been a violation of law. Illegal links will
          be removed immediately at the time we get knowledge of them.
        </p>

        <h2 class={styles.heading}>Copyright</h2>

        <p class={styles.paragraph}>
          Contents and compilations published on these websites by the providers
          are subject to German copyright laws. Reproduction, editing,
          distribution as well as the use of any kind outside the scope of the
          copyright law require a written permission of the author or
          originator. Downloads and copies of these websites are permitted for
          private use only. The commercial use of our contents without
          permission of the originator is prohibited. Copyright laws of third
          parties are respected as long as the contents on these websites do not
          originate from the provider. Contributions of third parties on this
          site are indicated as such. However, if you notice any violations of
          copyright law, please inform us. Such contents will be removed
          immediately.
        </p>
      </div>
    </>
  );
});
