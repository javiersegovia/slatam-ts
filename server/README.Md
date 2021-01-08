# Commands

## Install workflow

1. Create the `.env` file
2. Run `yarn` to install dependencies
3. Run `docker:db` to start the PostgresQL database
4. Run `yarn migrate:dev` or `yarn migrate:push` to apply database migrations (see migrations section below)
5. Run `yarn seed` to seed the database
6. Run `yarn dev` to start the Nest Server on Development mode

For running the server on Production mode:

- Run `yarn build` and then `yarn start`

Everytime you make a change to the `prisma/schema.prisma` file you must run the migrations (see migrations section below)

## Prisma migrations

### Creating a migration and applying it

- Run `yarn migrate:dev`

### Creating a draft migration (that you can modify)

- Run `yarn migrate:dev:create` to create the draft migration
- Modify the generated sql migration
- Run `yarn migrate:dev` to apply the modified migration

### Reset the database

- Run `yarn migrate:dev:reset`

### Prototyping

This commands should only be used as a prototyping tool for fast development. **Should be used only for reaching the desired application state.** After that, we should use migrations always.

- Run `yarn migrate:push` to update the database schema.
- Run `yarn migrate:push:force` to update the database schema with changes that may cause data loss

## Administration

We are using **Prisma Studio** to get direct access to the database.

- Run `yarn prisma:studio` to open the application in your browser.
