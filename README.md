# Comment faire une API Express

## Pré-requis

### Desactiver Copilot

Sinon TIG + exclusion du workshop.

### Installer nodejs et npm

Fedora / RHEL `sudo dnf install nodejs npm`\
---\
Ubuntu / Debian `sudo apt install nodejs npm`\
---\
Arch `sudo pacman -Sy nodejs npm`

### Postman (Optionnel, mais le workshop sera plus pratique avec)

- Telechargez Postman version **Linux (x64)** sur [le site officiel](https://www.postman.com/downloads/).

- Depuis le dossier Downloads, bougez l'archive vers un dossier global comme opt :

```bash
sudo mv postman-linux-x64.tar.gz /opt/ && cd /opt/
```

- Decompressez l'archive :

```bash
sudo tar xzvf postman-linux-x64.tar.gz
```

- Supprimez l'archive :

```bash
sudo rm postman-linux-x64.tar.gz
```

- Faites un symlink :

```bash
sudo ln -s /opt/Postman/Postman /usr/local/bin/postman
```

- Créez le fichier pour avoir l'application bureau Postman:

```bash
touch ~/.local/share/applications/postman.desktop
```

Editez le fichier avec ces informations :

```text
[Desktop Entry]
Name=Postman
GenericName=API Client
X-GNOME-FullName=Postman API Client
Comment=Make and view REST API calls and responses
Keywords=api;
Exec=/usr/local/bin/postman
Terminal=false
Type=Application
Icon=/opt/Postman/app/resources/app/assets/icon.png
Categories=Development;Utilities;
```

### Demarrer le projet

Lancer le projet avec npm pour verifier que tout démarre :

```bash
npm i && npm run dev
```

Vous aurez surement une erreur avec un code **'ERR_SOCKET_BAD_PORT'**, c'est _normal_.

Vous pouvez aller voir à quoi est directement relié `npm run dev` dans le fichier `package.json` mais pas besoin d'y toucher pour l'instant.

## _Exercices

### 1 _ Definir le port pour Express

Quand vous commencez votre API, on vous demande quel port vous souhaitez utiliser, par défaut pour express on utilise le port **3030**.

Nous utilisons un fichier `.env` qui sera lu par notre API pour lui donner, à vous de le remplir avec le bon (nous nous servons du paquet npm **dotenv** pour le lire).

### 2 _ Faire une requête

Pour faire une requête il existe plusieurs moyens :

- Navigateur internet : ouvrez une page sur `http://localhost:3030` (Ça ne marchera que pour un type de requête, attention)
- [curl](https://www.baeldung.com/curl-rest) : `curl -X GET localhost:3030`
- Postman : se réferer à la [documentation de Postman](https://learning.postman.com/docs/sending-requests/requests/)

#### Faire sa première route

Cet exercice a pour but de créer une première route de type **GET**, sur l'endpoint `/`, qui va tout simplement renvoyer `Hello World !`.

#### Query parameters

Maintenant que vous savez faire une requête, on va faire une nouvelle route :

Cette route de type **GET**, aura l'endpoint `/hello`.

Sa spécificité est de prendre un [query parameter](https://learning.postman.com/docs/sending-requests/requests/#sending-parameters) _name_.

La route devra renvoyer `Hello` + le paramètre donné à `name`.

#### Requêtes POST

Nous allons maintenant utiliser un nouveau type de requête : **POST**.

Cette requêtes devra prendre un [body](https://www.baeldung.com/curl-rest) de type `raw JSON`

Ce JSON aura comme format :

```JSON
{
    "a" : 1,
    "b" : 3
}
```

Le but de la requête est de récupérer les deux nombres, les additionner et d'envoyer la somme.

Son endpoint sera `/sum`

Dans ce cas, elle enverra `4`.

Faites la même chose pour les 3 autres operations de base avec ces endpoints :
`/sub`, `/div`, `/mul`

#### Nouvelle route

Faites une route qui écoute les requêtes de type GET.

Son endpoint sera `/rand`

Elle prend deux query parameters :

`min` et `max`

Elle devra renvoyer un nombre aléatoire entre _min_ (inclu) et _max_ (inclu).

Exemple avec `?min=4&max=10`

On aura en retour :

`6`

### 3 _ Ajouter un middleware

Nous avons maintenant envie d'afficher les propriétés de toutes les requêtes qui passent sur notre API,
pour se faire, Express propose des petits modules appelés **middlewares** qui vont avoir un seul rôle en particulier, et agir en fonction.

Pour cet exercice nous voulons un middleware de type "**logger**" qui va être utilisé avant de passer dans _toutes_ les routes et qui va scanner chaques requêtes.

Nous souhaitons que ce logger affiche, respectivement :\
L'**heure** de la requête, la **méthode** de la requête, et le **nom** de la route qui a été visée par la requête.

N'oubliez pas que le middleware doit passer avant la route en question, donc si je fais une requête GET à 13h54 sur `/`, je dois voir :\
`13:54:21 GET /`\
PUIS\
`Hello World !`

Et non pas l'inverse.

### 4 _ Dog API

Maintenant nous allons faire un nouvel endpoint de type GET `/randog`

Il a pour but de renvoyer l'adresse de l'image d'un chien aléatoire.

La banque de donnée de chien est située dans le fichier `breed_list.json`

À vous de voir comment importer le fichier et de le lire, puis de renvoyer une image aléatoire de chien.

On s'attend à ce que vous alliez sur
`http://localhost:3030/randog` avec votre navigateur et qu'une image de chien s'affiche (à vous de gérer l'affichage de l'image sur le navigateur)

### 5 _ BONUS

Si vous êtes arrivés jusque là, bravo, vous n'avez touché qu'à une infime partie d'une API.

Libre à vous de faire ce que vous voulez, comme par exemple ajouter les informations du chien depuis la banque de données, ajouter une route qui prends la race du chien en query parameter et renvoie les différentes informations de celui ci.
