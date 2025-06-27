# Proyecto de Gestion Agreicola "GestionA"

## SetUp
Instalar y crear una cuenta en [Docker desktop](https://www.docker.com/products/docker-desktop/)
Instalar [Table Plus](https://tableplus.com/) *opcional*
Instalar [nodeJS](https://nodejs.org/en/) de la version 20 en adelante
Instalar [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) *opcional*

## `install dependencies`
```sh
npm install
```

## `run project`

- Levantar la base de datos en un contenedor de Docker
```sh
npm run docker
```
- Popular la base de datos
```sh
npm run seed
```
- Levantar el proyecto en modo desarrollo 
```sh
npm run dev
```

- Bajar el contenedor 
```sh
npm run down
````

