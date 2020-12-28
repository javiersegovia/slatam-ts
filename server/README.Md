# Commands

## Install workflow

1. Run `yarn` to install dependencies
2. Create the `.env` file
3. Run `docker:db` to start the PostgresQL database
4. Run `yarn migrate:dev` to apply database migrations
5. Run `yarn seed` to seed the database
6. Run `yarn dev` to start the Nest Server on Development mode

For running the server on Production mode:

- Run `yarn build` and then `yarn start`

## Prisma migrations

### Creating a migration and applying it

- Run `yarn migrate:dev`

### Creating a draft migration (that you can modify)

- Run `yarn migrate:dev:create` to create the draft migration
- Modify the generated sql migration
- Run `yarn migrate:dev` to apply the modified migration

### Reset the database

- Run `yarn migrate:dev:reset`
