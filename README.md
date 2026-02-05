# Projet Phantasialand

Objectifs:
- Récupérer et jouer avec une API de Phantasialand
- Permettre à des utilisateurs de créer leur compte et de voter pour leur top
- Gérer une base de données avec toutes les informations

LANCER LE PROJET :\
    1- concurrently "npm run dev" "lcp --proxyUrl https://queue-times.com" \
    2- SI mongod n'est pas lancé : sudo systemctl start mongod OU sudo mongod --dbpath /var/lib/mongo --bind_ip 127.0.0.1 \
    3- node server.js


-----------------------------------------------------------------------

USER:
- Un user peut créer, modifier et supprimer son compte.
- Un user peut se connecter et se déconnecter.
- Un user peut regarder en direct les temps d'attente sur le parc
- Un user peut regarder une carte interactive du parc.
- Un user peut demander en ami un autre user.
- Un user peut supprimer un autre user en tant qu'amis.
- Un user peut voter pour son attraction préférée : un vote ça vs ça avec l'attraction votée qui reste à chaque tour etc
- Un user peut voir son classement ainsi que celui de ses amis.

ADMIN:
- Un admin peut accéder à une interface spéciale avec ses identifiants.
- Un admin peut créer, modifier et supprimer n'importe quel compte.

-----------------------------------------------------------------------

ETAPE 1 : Voir si il est possible de récupérer une API concernant Phantasialand (OK -> WaitTime.jsx)\
ETAPE 2 : Mettre en forme la page, avec une barre de navigation et un bouton de connexion pour les utilisateurs \
ETAPE 3 : Mettre en place toute la gestion utilisateurs / admin 
