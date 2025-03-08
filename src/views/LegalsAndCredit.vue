<template>
  <div className="legals">
    <h1>Crédits et mentions légales</h1>
    <div className="content">
      <a href="/" className="legals__link">
        Revenir au jeu
      </a>
      <div className="content__section">
        <h2 className="content__section__title">1. Informations générales</h2>
        <div className="content__section__text">
          Ce site a été réalisé en 2025 par deux étudiants en 2ème année de BUT MMI Bordeaux, dans un cadre extra-scolaire. Nous
          prenons en compte toutes les remarques et suggestions, n'hésitez pas à nous en faire ! Le code source du jeu
          est disponible sur <a href="https://github.com/simdgtk/endless-crowd" target="_blank"
            rel="noopener noreferrer" title="Voir le code source sur GitHub (ouvre un nouvel onglet)">GitHub</a>.
        </div>
        <ul className=" content__section__list">
          <li>
            Responsables de la publication : Simon Daguet-Kargl et Edgar Quéméré
          </li>
          <li>Adresse : 33100 Bordeaux</li>
          <li>Email : <a href="mailto:simondaguetkargl@gmail.com"
              title="Envoyer un e-mail à Simon Daguet-Kargl">simondaguetkargl@gmail.com</a></li>
          <li>
            Réalisation : Edgar Quéméré (conception, design principal, assets), Simon Daguet-Kargl (conception,
            développement principal, design)
          </li>
        </ul>
        <h3>Hébergeur :</h3>
        <ul className="content__section__list">
          <li>Nom : Vercel Inc.</li>
          <li>Adresse : 340 S Lemon Ave #4133 Walnut, CA 91789</li>
          <li>Téléphone : (559) 288-7060</li>
        </ul>
        <div className="content__section__text">
          Tous les contenus présents sur ce site (textes, images,
          illustrations, graphiques, logos, etc.) sont protégés par les lois
          en vigueur sur la propriété intellectuelle.
        </div>
        <div className="content__section__text">
          Toute reproduction ou utilisation des contenus sans autorisation
          expresse est strictement interdite.
        </div>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">2. Données personnelles</h2>
        <div className="content__section__text">
          Ce site respecte les réglementations en matière de protection des
          données personnelles (RGPD). Aucune collecte de données personnelles
          n&apos;est effectuée.
        </div>
        <div className="content__section__text">
          Les données éventuellement collectées (via local storage)
          ne nous sont pas accessibles et sont uniquement destinées à améliorer l&apos;expérience utilisateur.
        </div>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">3. Responsabilités</h2>
        <h3>Contenus :</h3>
        <ul className="content__section__list">
          <li>
            Nous ne pourrons être tenus responsables des
            erreurs ou omissions dans les contenus du site.
          </li>
        </ul>
        <h3>Accessibilité :</h3>
        <ul className="content__section__list">
          <li>
            Bien que tout soit mis en œuvre pour assurer une accessibilité optimale, aucune garantie n'est fournie
            concernant la disponibilité ininterrompue du site.
          </li>
        </ul>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">4. Contact</h2>
        <h3>
          Pour toute question concernant le site ou ses mentions légales, vous
          pouvez contacter :
        </h3>
        <ul className="content__section__list">
          <li><a href="mailto:simondaguetkargl@gmail.com"
              title="Envoyer un e-mail à Simon Daguet-Kargl">simondaguetkargl@gmail.com</a></li>
        </ul>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">
          5. Mise à jour des mentions légales
        </h2>
        <div className="content__section__text">
          Ces mentions légales peuvent être modifiées à tout moment pour
          s&apos;adapter à l&apos;évolution du site ou des réglementations en vigueur.
          Merci de les consulter régulièrement.
        </div>
        <p>Dernière mise à jour : 8 mars 2025</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
body {
  overflow: auto;
  width: fit-content;
  height: fit-content;
}

.legals {
  max-width: 750px;
  margin: 0 auto;

  h1 {
    margin: 64px 0 32px 0;
    border-bottom: 2px solid black;
    padding-bottom: 16px;
    width: fit-content;
    font-size: 32px;

    @media screen and (max-width: 850px) {
      margin-left: 24px;
    }
  }

  h2 {
    margin-bottom: 24px;
    font-size: 24px;
  }

  h3 {
    margin-bottom: 16px;
  }

  &__link {
    display: inline-block;
    margin: 24px 0;
  }

  .content {
    padding-bottom: 24px;

    @media screen and (max-width: 850px) {
      padding: 0 24px 24px 24px;
    }

    &__section {
      margin-bottom: 64px;

      &__text {
        margin-bottom: 24px;
      }

      &__list {
        list-style: disc inside;
        margin-bottom: 24px;

        li {
          margin-left: 24px;
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>