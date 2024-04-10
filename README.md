## Running the app

# node version: 20.12.1
# npm version: 10.5.0


```bash
#install packages
$ npm install

#start database
sudo docker-compose up -d

#run migrations
npm run typeorm migration:run

# watch mode
$ npm run start:dev

```

## Migrations

```bash
# run migrations
$ npm run typeorm migration:run

# generate migration
$ npm run migration:generate --name=<$name_of_migration>

```
