
# Example de projet statique

Cette documentation explique comment automatisé les taches répétitives d'un projet pour vous laisser vous concentrer sur votre travail.


## Préparer l'environnement

La première fois que vous récupérez le projet, vous devez préparer/adapter votre environnement pour ce projet.

Avant toute chose, si ce n'est déjà fait, vous devez installer les outils suivant sur votre système:

* [Ruby](https://www.ruby-lang.org/fr/)
* [Rubygems](http://rubygems.org/)
* [Bundler](http://bundler.io/)
* [NodeJS](http://nodejs.org/)
* [grunt-cli](http://gruntjs.com/getting-started)

Si vous utilisez un Mac, vous devez installer [XCode](https://developer.apple.com/xcode/) et [les outils de ligne de commande](http://docwiki.embarcadero.com/RADStudio/XE4/fr/Installation_des_outils_en_ligne_de_commande_Xcode_sur_un_Mac) (cela installera automatiquement Ruby et Rubygems)

**NOTE :** _Toute les commandes ci-après doivent être executé depuis le repertoire du projet, jamais dans l'environnement global._


### Environnement Ruby

Ce projet à besoin de certaines Gem pour pouvoir être automatisé.

* compass 0.12.2

A chaque fois que vous prévoyez de travailler sur ce projet, vous devez vous assurez que les Gems de votre environnement sont dans les versions attendu par le projet. La façon la plus simple de mettre l'environement en conformité est d'utiliser [bundler](http://bundler.io).

Pour mettre votre environnement à jour, utilisez cette commande :

```bash
$ bundle install
```

**NOTE : ** _Si vous ajoutez des Gems pour automatisé le projet, vous devez mettre à  jour les fichiers `Gemfiles` et `Gemfiles.lock` pour que les autres developpeurs puissent mettre leur environnement à jour proprement._


### Environnement NodeJS

Ce projet automatise les taches grace à [grunt](http://gruntjs.com) et utilise les modules NodeJS suivant :

* grunt 0.4.2
* grunt-contrib-clean 0.5.0
* grunt-contrib-compass 0.6.0
* grunt-contrib-concat 0.3.0
* grunt-contrib-connect 0.5.0
* grunt-contrib-copy 0.4.1
* grunt-contrib-watch 0.5.3
* assemble 0.4.28
* lodash 2.4.0
* js-beautify 1.4.2

Pour installer les modules dans le repertoire de votre projet, utiliez la commande suivante:

```bash
$ npm install
```

**NOTE :** _Si vous ajoutez des modules pour automatiser le projet, vous devez mettre à  jour le fichier `package.json` pour que les autres developpeurs puissent mettre leur environnement à jour proprement._

_La façon la plus simple de mettre ce fichier à jour et d'ajouter l'option de commande `--save-dev` lorsque vous utilisez `npm intall` pour ajouter un module._


## Travailler sur le projet

Pour produire une version statique du projet, utilisez la commande suivante:

```bash
$ grunt build
```

**NOTE :** _Il est recommandé d'executer cette commande la première fois que vous récupérez le projet et à chaque fois que vous mettez le projet à jour._

Pour vous simplifier la vie, utilisez l'observateur pour qu'à chacun de vos changements ceux-ci soient automatiquement pris en compte dans la version statique du projet.

Pour lancer l'observateur, utilisez la commande suivante :

```bash
$ grunt watch
```

Si vous le souhaitez, vous pouvez en même temps lancer un serveur web qui permettra de consulter le site web statique généré à l'adresse `http://localhost:8000`

Pour lancer l'observeur et le serveur web en même temps, utlisez la commande suivante:

```bash
$ grunt live
```

**NOTE :** _Le serveur lancé de cette manière utilise livereload : A chaque fois que l'observateur verra un changement, le serveur mettra la page à jour._

Pour lancer le serveur seul, utilisez la commande suivante:

```bash
$ grunt connect:server
```

### Commandes individuelles

Si vous ne voulez pas utiliser l'observateur, vous pouvez utiliser les commandes suivantes en fonctions de vos besoins:

```bash
# Construire la structure HTML du projet
$ grunt html
```
```bash
# Construire la documentation du projet
$ grunt docs
```
```bash
# Compiler les fichiers SASS et copie les assets (img/fonts)
$ grunt css
```
```bash
# Mettre les scripts à jours
$ grunt scripts
```

**NOTE :** _Chacune de ces commandes peut être utilisée comme un observateur spécifique. Ainsi, par exemple, `watch:docs` mettra à jour la documentation automatiquement lorsque vous l'éditez, et seulement la documentation._