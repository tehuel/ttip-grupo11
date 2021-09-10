# Recetaris - Backend

Server express nodejs

## Configuración

Crear un archivo `.env` (se puede usar como referencia el archivo `.env.example`)

```shell
cp .env.example .env
```

Completar la configuración necesaria:

```dotenv
NODE_ENV=development
HOST=127.0.0.1
PORT=3000
MONGO_URL=<completar con URL de MongoDB>
```

## Setup

```bash
# instalar dependencias
$ npm install

# iniciar servidor (con hot-reload) en localhost:3000
$ npm run start
```

## Tests

```bash
# ejecutar tests
$ npm run test
```

