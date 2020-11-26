---
layout: post
title: 'Bloquer des IPs dans Elasticsearc avec SearchGuard'
author: [Sarah L.CORSELIS]
image: img/wall.jpg
date: '2020-11-26T23:46:37.121Z'
draft: false
tags:
  - Search-guard
  - Tips
---
Bloquer l'accès à Elasticsearch pour des IP spécifiques ou des plages d'IP.

Search Guard fournit un chiffrement TLS et un contrôle d'accès basé sur les rôles (RBAC) à toutes les données stockées dans Elasticsearch. Cela empêche les utilisateurs non autorisés d'accéder aux données de votre cluster Elasticsearch.

Dans certaines situations, vous pouvez vouloir gérer les accès au niveau du réseau et limiter l'accès de manière plus spécifique , par exemple, n'autoriser l'accès que si la demande provient de votre réseau interne. Pour ce faire, vous pouvez utiliser la fonction de blocage d'IP de Search Guard.

### **Global blocs**

Search Guard peut ainsi gérer différents types de blocs et vous permettre de contrôler l'accès à votre cluster Elasticsearch à une échelle globale.

Vous pouvez autoriser ou interdire l'accès en fonction des critères suivants :
- Nom d'utilisateur
- IPs
- Netmasks 

Les blocs peuvent être ajoutés et retirés au moment de leur exécution : 
- en téléchargeant le fichier de configuration `sg_blocks.yml` à [l'aide de sgadmin](https://docs.search-guard.com/latest/main-concepts#block-user--ip-addressnet-mask) 
- en utilisant le Blocks API REST

Un bloc se compose de :

- un nom unique
- un type (nom, IP, masque de réseau)
- un verdict (autoriser, refuser)
- une description (facultatif

### **Whitelister une plage IP**

Nous voulons accorder l'accès à notre cluster Elasticsearch à partir de notre réseau IP interne uniquement, qui dans notre cas, peut être n'importe quelle adresse IP comprise entre 192.168.0.0 et 192.168.255.255.

Pour cela, nous ajoutons un nouveau bloc dans blocks.yml et mettons en liste blanche la plage d'IP en utilisant un masque de réseau :
```
allow_internal_network:
  type: "net_mask"
  verdict: "allow"
  value: ["192.168.0.0/16"]
  description: "Allow internal network"
```
Après avoir téléchargé le fichier blocks.yml en utilisant sgadmin, les changements prennent effet immédiatement. L'accès n'est désormais possible que depuis le réseau interne. Comme alternative, vous pouvez utiliser l’ [API REST Blocks](https://docs.search-guard.com/latest/rest-api-blocks#put) tel que : 
```
curl -u admin:admin \
  -XPUT "https://es.example.com:9200/_searchguard/api/blocks/internalnetwork" \
  -H 'Content-Type: application/json' \
  -d \
'    {
    "type" : "net_mask",
    "value" : [""192.168.0.0/16"],
    "verdict" : "allow",
    "description" : "Internal network only"
  }
'
```

### **Blacklister des IP individuelles**
En plus de pouvoir whitelister une IP ou une plage IP, vous pouvez aussi en blacklister certaines. Search Guard appliquera d'abord la liste blanche, puis la liste noire.

Si vous souhaitez exclure une ou plusieurs IP internes de la plage d'IP autorisée précédemment configurée, il vous suffit d'ajouter un nouveau bloc avec le verdict d'interdiction :
```
curl -u admin:admin \
  -XPUT "https://es.example.com:9200/_searchguard/api/blocks/internalnetwork_block_ips" \
  -H 'Content-Type: application/json' \
  -d \
'    {
    "type" : "ip",
    "value" : ["192.168.180.1"],
    "verdict" : "disallow",
    "description" : "Block specific internal IPs"
  }
'
```
### Ajouter et supprimer des blocs de façon dynamique 


Comme pour tous les changements de configuration de Search Guard, toute mise à jour des paramètres des blocs prendra effet immédiatement. Si votre cluster est menacé, par exemple par des attaques brute-force sur les comptes utilisateurs ou par des attaques DDOS, vous pouvez ajouter et supprimer des blocs immédiatement.

### Pour aller plus loin

- Lire [la documentation sur les blocs](https://docs.search-guard.com/latest/main-concepts#block-user--ip-addressnet-mask) pour plus d'exemples 
- Consultez [la documentation de l'API REST Blocs](https://docs.search-guard.com/latest/rest-api-blocks)

> Publié le 12/11/2020 sur [le blog Search Guard](https://search-guard.com/elasticsearch-block-ips/)

> <span>Photo par <a href="https://unsplash.com/@sonance?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Viktor Forgacs</a> sur <a href="https://unsplash.com/s/photos/firewalls?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
