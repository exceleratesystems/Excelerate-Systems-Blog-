import React from 'react';
import { Helmet } from 'react-helmet';

import { css } from '@emotion/core';

import { Footer } from '../components/Footer';
import SiteNav from '../components/header/SiteNav';
import { PostFullContent } from '../components/PostContent';
import { Wrapper } from '../components/Wrapper';
import IndexLayout from '../layouts';
import {
  inner,
  outer,
  SiteArchiveHeader,
  SiteHeader,
  SiteMain,
  SiteNavMain,
} from '../styles/shared';
import { NoImage, PostFull, PostFullHeader, PostFullTitle } from '../templates/post';
import { colors } from '../styles/colors';

const PageTemplate = css`
  .site-main {
    margin-top: 64px;
    padding-bottom: 4vw;
    background: #fff;
  }

  @media (prefers-color-scheme: dark) {
    .site-main {
      /* background: var(--darkmode); */
      background: ${colors.darkmode};
    }
  }
`;

const About: React.FC = () => (
  <IndexLayout>
    <Helmet>
      <title>À propos d'Excelerate Systems</title>
    </Helmet>
    <Wrapper css={PageTemplate}>
      <header className="site-archive-header no-image" css={[SiteHeader, SiteArchiveHeader]}>
        <div css={[outer, SiteNavMain]}>
          <div css={inner}>
            <SiteNav isHome={false} />
          </div>
        </div>
      </header>
      <main id="site-main" className="site-main" css={[SiteMain, outer]}>
        <div css={inner}>
          <article className="post page" css={[PostFull, NoImage]}>
            <PostFullHeader className="post-full-header">
              <PostFullTitle className="post-full-title">Excelerate Systems</PostFullTitle>
            </PostFullHeader>

            <PostFullContent className="post-full-content">
              <div className="post-content">
                <p>
                <b>Excelerate Systems - France</b> est née de la volonté de créer une offre de nouvelles solutions ; innovantes, faciles à utiliser, 
                hautement performantes et économiquement avantageuses, pour répondre efficacement et rapidement à la complexité des environnements informatiques de ses clients.<br></br> 

                Excelerate Systems est une entreprise privée, fondée en 2007. Le siège social est à Seattle, USA avec une représentation pour l’Europe basée en France à Bordeaux, pour l’Amérique Latine à Mexico et un réseau de revendeurs dans plus de vingt pays. <br></br>
                <hr></hr>
                Nous adressons les PME/PMI, les Grandes Entreprises et les Organismes Publics, car ils ont besoin d'un Partenaire qui saura les aider à faire les bons choix dans un contexte en perpétuel mouvement. <br></br>

                Le marché des logiciels pour les entreprises continue d'évoluer à un rythme surprenant – OpenData, BigData, Sécurité, Protection des données personnelles, Cloud, SaaS, Mobilité, BYOD…... pour n'en citer que quelques-uns. <br></br>

                Depuis 2007, nous leur proposons des Produits et Services informatiques innovants en sélectionnant les meilleurs solutions actuellement disponibles sur le marché. 

                Nous avons développé une offre riche dans 4 catégories : </p>
                <p>
                1. La Big Data, Le Cloud et la Virtualisation <br></br>
                2. La Sécurité et la Protection des Données <br></br>
                3. La Gestion et la Sécurisation de la Mobilité professionnelle. <br></br>
                4. L’Optimisation des Infrastructures Informatiques et des Operations du SI. <br></br>

                Aujourd’hui, la demande d’expertise en techniques informatiques est en constante augmentation. <br></br><hr></hr>

                Avec nos partenaires, nous mettons à votre service une équipe d’ingénieurs commerciaux et de consultants hautement qualifiés pour répondre efficacement à vos demandes.
                </p>
              </div>
            </PostFullContent>
          </article>
        </div>
      </main>
      <Footer />
    </Wrapper>
  </IndexLayout>
);

export default About;
