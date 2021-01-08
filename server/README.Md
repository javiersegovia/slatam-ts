# Server GraphQL API

## Quickstart

1. Create the `.env` file
2. Run `yarn` to install dependencies
3. Run `docker:db` to start the PostgresQL database
4. Run `yarn migrate:dev` or `yarn migrate:push` to apply database migrations (see migrations section below)
5. Run `yarn seed` to seed the database
6. Run `yarn dev` to start the Nest Server on Development mode

For running the server on Production mode:

- Run `yarn build` and then `yarn start`

Everytime you make a change to the `prisma/schema.prisma` file you must run the migrations (see migrations section below)

## Folder architecture

This folder architecture will be updated as the project grows.

```
dist/                                   # Generated build folder
generated/                              # Auto generated GraphQL schemas and types
prisma/                                 # Entrypoint for the database schema
│   └── schema.prisma
specs/                                  # Tests folder
src/
├── lib/                                # Library folder, utilities used among the project
│   resources/                          # Collection of resources grouped by features
│   ├── [resourceName]
│   │   ├── dto/       
│   │   ├── index.ts                    # Entry file for re-exporting all the resourceName files
│   │   ├── [resourceName].entity.ts    # NestJS Entity model definition
│   │   ├── [resourceName].module.ts    # NestJS Module
│   │   ├── [resourceName].resolver.ts  # NestJS GraphQL Resolver
│   │   └── [resourceName].service.ts   # NestJS Service
│   │   ...
│   │   ...
│   └── modules.ts                      # Entry file for re-exporting all the resources modules
│
├── app.module.ts                       # NestJS Application Module
└── main.ts                             # Express Server Entrypoint
```

## Workflow considerations

- If you make changes to the `schema.prisma` file, make sure you run a migration command (see migrations section) to generate the updated Prisma Client types.

- Take a look at the paths aliases defined in `tsconfig.json`. They may help you understand some imports across the project.

- Before creating a new resource, make sure the new feature does not fit inside an existing resource (e.g., you may create a `comment` entity inside a resource folder named `post`).

- After you create a new resource, make sure to re-export all the files in the `index.ts`.

- Use *camelCase* for naming fields. (e.g., `userId`, `createdAt`).

- Use *PascalCase* for naming classes and types. (e.g., `UserService`, `IUserInterface`).

- Use *dot.notation* for naming files inside a resource. (e.g., `user.resolver.ts`, `post.entity.ts`)

- Use the first letter of the type as a prefix for the name when you write types or interfaces (e.g., `TUserType`, `ICompanyInterface`)

## Database Migrations

### Creating a migration and applying it

- Run `yarn migrate:dev`

### Creating a draft migration (that you can modify)

1. Run `yarn migrate:dev:create` to create the draft migration
2. Modify the generated sql migration
3. Run `yarn migrate:dev` to apply the modified migration

### Reset the database

- Run `yarn migrate:dev:reset`

### Prototyping

This commands should only be used as a prototyping tool for fast development, and **only for reaching the desired application state.** After that, we should always use migrations.

- Run `yarn migrate:push` to update the database schema.
- Run `yarn migrate:push:force` to update the database schema with changes that may cause data loss

## Administration Interface

We are using **Prisma Studio** to get direct access to the database.

- Run `yarn prisma:studio` to open the application in your browser.
