---
layout: post
title: 'Search Guard - Compliance Edition'
author: [Aadel Benyoussef]
tags: 
  - Compliance
  - Search-guard
  - Data privacy
  - Data protection
  - Elasticsearch
image: img/sg.jpg
date: '2018-06-13T23:46:37.121Z'
draft: false
excerpt: Nous sommes très fiers de vous annoncer Search Guard™ Compliance Edition !
---

Nous sommes très fiers de vous annoncer Search Guard™ Compliance Edition !

Des fonctionnalités additionnelles à "Search Guard Enterprise Edition", qui vous aideront à vous conformer aux réglementations telles que RGPD, SOX et ISO.

Intégrité de l’installation d’Elasticsearch et de la configuration de Search Guard

La 1ère fonctionnalité et non des moindres, Search Guard vous permettra de contrôler et de garantir l’intégrité de votre installation d'Elasticsearch et de Configuration de Search Guard.

Intégrité de l’installation d’Elasticsearch

Quand vous voulez démarrer un nœud, Search Guard peut émettre un événement qui liste :

- Les paramètres dans elasticsearch.yml

- Les variables d’environnement utilisées dans elasticsearch.yml

- Les propriétés Java

- Les fichiers utilisés par Search Guard, par exemple cerficats PEM, keystores ou keytabs Kerberos

En plus, Search Guard calcule un hash de ces paramètres, pour que vous puissiez détecter immédiatement des modifications faites à votre installation d’Elasticsearch.

Intégrité de configuration de Search Guard

De façon similaire, le suivi d'intégrité de la configuration de Search Guard enregistre les actions concernant l’accès en lecture-écriture à la configuration de Search Guard. Vous pouvez voir qui a eu accès à la configuration, et quelles modifications ont été faites.

Voulez-vous savoir quand un rôle particulier a été ajouté, ou quelles étaient les autorisations pour un rôle particulier à un moment donné ?

Notre nouveau suivi de configuration vous permet de faire exactement cela. Si vous stockez ces événements dans un indice immuable, vous maîtriserez toujours votre configuration sécurisée.

Historique de lecture

Cette fonctionnalité vous permet de connaitre exactement quels champs dans vos documents ont été consultés, et par quel utilisateur. Cela vous aide à répondre à plusieurs questions du RGPD.

Selon le RGPD, vous êtes obligé d’informer vos utilisateurs ou clients de précisément qui, dans votre entreprise, peut accéder à vos détails personnels, et à quelles fins. Avec  l'historique de lecture, vous pouvez faire exactement cela : il est possible de surveiller et tracer l’accès aux détails confidentiels, par exemple prénom, nom, adresse mail, etc., et de stocker les données dans Elasticsearch, Kafka, Cassandra ou dans tout autre système de votre choix.

Historique d’écriture

De façon similaire, l'historique d'écriture permet de retracer la création ou suppression de documents ou les changements faits aux documents dans votre cluster. Search Guard enregistre les modifications en format « JSON patch ». Ainsi, vous pouvez savoir comment un document a été modifié au cours du temps, ce qui est extrêmement utile puisque si vous enregistrez des données personnelles identifiables (PII), votre client peut :

- Demander des renseignements concernant quelles données personnelles identifiables sont stockées

- Demander des renseignements concernant quand les données ont été créées

- Demander que des modifications soient apportées aux données personnelles identifiables

- Demander que les données soient supprimées (« droit à l’oubli »)

Avec l’historique d’écriture, vous pouvez garder une trace d’audit pour tous ces événements, et la mettre à disposition de votre client.

Il est maintenant beaucoup plus facile de vous conformer au RGPD grâce à l’historique de lecture et d’écriture, mais nous ne nous arrêtons pas là.

Dans « Compliance Edition », nous avons ajouté de nombreuses nouvelles fonctionnalités pour vous aider à vous conformer.

Anonymisation des champs

Une des fonctionnalités de Search Guard est la sécurité au niveau des champs, qui vous permet de filtrer les champs sensibles dans vos documents. Si vous configurez une liste noire de champs, Search Guard les filtrera en conséquence. Cependant, dans certains cas vous pouvez avoir besoin d’anonymiser des champs plutôt que de les enlever. Pour ce faire, il faut remplacer la valeur en texte clair par un hash cohérent et sécurisé.

Jusqu'à présent, il fallait faire cela en enregistrant un champ sous deux formes : en forme de texte clair, et en forme de valeur de hash. La méthode normalement utilisée pour remplacer une valeur par un hash quand il s’agit d’acquérir et de collectionner des données est d’utiliser le plugin Logstash « fingerprint », par exemple. Mais grâce à la fonctionnalité d'anonymisation des champs offerte par Search Guard, cela n’est plus nécessaire. Vous pouvez stocker la valeur en texte clair, et ensuite Search Guard la remplacera par un hash quand vous exécutez une requête. La configuration de l’anonymisation des champs s’effectue par rôle : vous pouvez par exemple préciser qu’un utilisateur disposant de droits d’administrateur ou de gestionnaire peut voir la valeur en texte clair, alors que tous les autres utilisateurs ne voient que le hachage.

Search Guard utilise Blake2bDigest pour calculer le hash. Cet algorithme atteint un bon équilibre entre vitesse et sécurité, et dispose du support intégré pour le hachage aléatoire, qui est configurable dans elasticsearch.yml avec une longueur minimum de 32 caractères pour des raisons de sécurité.

L’anonymisation est très facile à utiliser et à configurer, mais elle a également un impact sur le RGPD, puisque les données anonymisées ne sont pas des données personnelles identifiables (PII).

Autrement dit, si un utilisateur ne voit que la version hash des données en texte clair, plusieurs règles de conformité ne s’appliquent plus. En conséquence, les champs anonymisés sont automatiquement exclus de l’historique de lecture dans Search Guard !    

Indices immuables – Intégrité des données

Search Guard vous offre deux fonctionnalités clés pour protéger l’intégrité de vos données. Avec TLS, vous pouvez vous assurer que vos données ne seront pas modifiées pendant leur transit. Et en implémentant le contrôle d’accès à base de rôles, vous pouvez préciser quels utilisateurs ont le droit de créer, modifier ou supprimer des données. Avec les indices immuables, l’intégrité des données prend une nouvelle dimension.

Si un indice est marqué comme immuable, vous pouvez créer des documents dans l’indice, mais vous ne pouvez plus jamais les modifier.

Cela suit la technique « write-once read-many » et est très utile si vous devez vous assurer que les données ne peuvent pas être modifiées une fois enregistrées. Toutes sortes d’événement d’audit et de conformité se trouvent dans cette catégorie – une fois écrits, vous ne voulez pas qu’ils soient modifiés. Il est facile de marquer un indice comme immuable – il suffit juste de le lister dans elasticsearch.yml :

En outre, Search Guard veille à ce que vos indices ne soient pas modifiés directement. Les opérations suivantes sont interdites pour un indice immuable:

- Supprimer l’indice
- Ouvrir et fermer l’indice
- Réindexer l’indice
- Restaurer à partir de snapshots

Routage d’événements d’audit

Vous pouvez stocker des événements d’audit dans plusieurs points d’accès, y compris Elasticsearch, Webhooks, Kafka, Cassandra, et plein d’autres. Jusqu'à maintenant, le module de traçabilité d’audit vous permettait de configurer et d’utiliser un seul point d’accès pour tous les événements. Maintenant, Compliance Edition vous offre les fonctionnalités de routage d'événements flexible et ciblage multipoints.

Vous pouvez par exemple stocker des événements qui se trouvent dans l’audit pour l’historique de lecture et d’écriture dans Kafka, tout en envoyant tous les événements de sécurité, par exemple des tentatives de connexion échouées ou des privilèges manquants, à un système SIEM. Le routage est basé sur la catégorie d’événement, et il est possible de stocker des événements dans plusieurs points d’accès à la fois.

Les fonctionnalités de piste d’audit et de conformité sont alors extrêmement flexibles en ce qui concerne le point d’accès pour le stockage. La nouvelle configuration est entièrement rétro compatible, ce qui veut dire que si vous utilisiez le module d’audit précédent, vous pouvez maintenant introduire de nouvelles options de ciblages étape par étape.
