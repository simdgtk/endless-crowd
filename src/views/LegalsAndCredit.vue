<template>
  <div className="legals">
    <h1>Mentions légales</h1>
    <a href="/" className="legals__link">
      Revenir à l&apos;expérience 3D
    </a>
    <div className="content">
      <div className="content__section">
        <h2 className="content__section__title">1. Informations Générales</h2>
        <div className="content__section__text">
          Ce site a été réalisé dans le cadre d&apos;un projet étudiant.
        </div>
        <ul className="content__section__list">
          <li>
            Responsable de la publication : Simon Daguet-Kargl et Edgar Quéméré
          </li>
          <li>Adresse : 33100 Bordeaux</li>
          <li>Email : simondaguetkargl@gmail.com</li>
          <li>
            Réalisation : Simon Daguet-Kargl, Edgar Quéméré
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
        <h2 className="content__section__title">2. Données Personnelles</h2>
        <div className="content__section__text">
          Ce site respecte les réglementations en matière de protection des
          données personnelles (RGPD). Aucune collecte de données personnelles
          n&apos;est effectuée.
        </div>
        <ul className="content__section__list">
          <li>
            Les données éventuellement collectées (via local storage)
            sont uniquement destinées à améliorer l&apos;expérience utilisateur ne seront jamais cédées à des tiers et
            ne nous sont pas accessibles.
          </li>
        </ul>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">3. Responsabilités</h2>
        <h3>Contenus :</h3>
        <ul className="content__section__list">
          <li>
            Nous ne seront être tenus responsables des
            erreurs ou omissions dans les contenus du site.
          </li>
        </ul>
        <h3>Accessibilité :</h3>
        <ul className="content__section__list">
          <li>
            Bien que tout soit mis en œuvre pour assurer une accessibilité
            optimale, aucune garantie n&apos;est fournie concernant la
            disponibilité ininterrompue du site.
          </li>
        </ul>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">6. Contact</h2>
        <h3>
          Pour toute question concernant le site ou ses mentions légales, vous
          pouvez contacter :
        </h3>
        <ul className="content__section__list">
          <li>simondaguetkargl@gmail.com</li>
        </ul>
      </div>
      <div className="content__section">
        <h2 className="content__section__title">
          7. Mise à Jour des Mentions Légales
        </h2>
        <div className="content__section__text">
          Ces mentions légales peuvent être modifiées à tout moment pour
          s&apos;adapter à l&apos;évolution du site ou des réglementations en vigueur.
          Merci de les consulter régulièrement.
        </div>
        <p>Dernière mise à jour : 4 mars 2025</p>
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
  max-width: 800px;
  margin: 0 auto;

  h1 {
    margin-top: 64px;
    border-bottom: 2px solid black;
    padding-bottom: 24px;
    width: fit-content;

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
    margin-top: 24px;
  }

  .content {
    margin-top: 24px;
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