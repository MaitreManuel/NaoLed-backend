# NaoLED (backend)

## With Docker
 
```
docker-compose up
```

Server is now up on `http://localhost:5000`

## Without Docker
 
```
npm i # install dependencies
npm start # run API
```

# Install

Copier le `.env.dist` et le coller en `.env` (racine du projet).
À `DB_HOST`, mettre l'adresse de la base mongoDB.
À `DB_LINK`, mettre le port sur lequel le serveur marchera.
