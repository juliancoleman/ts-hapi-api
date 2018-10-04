# TS Hapi API

## Installation

In order to use this API, simply fork the repo, clone it to
your local machine, and make the necessary changes.

## Usage

A file with the name `.env` must exist at the project root
in order to run this project locally, in CI, and in a
deployed environment. The `.env` must follow the pattern
below:

```bash
DATABASE_USER=postgres # this is usually `$(whoami)` when not using Docker
DATABASE_PASSWORD=password # this cannot be left empty; must reflect environment var set in docker-compose.yml
DATABASE_NAME=ts_hapi_api # this can be changed
JWT_KEY=eggward # obviously change this, but cannot be empty
# Do not add a PORT variable to this file.
```

The database username and password must be decided before
going on to the next step.

### Locally (without Docker)

Follow the instructions on [DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04)
on how to set up PostgreSQL for our application. For MacOS
users, simply use Homebrew instead.

From there, run the following command:

```bash
yarn knex migrate:latest
```

You can then run the server with `yarn start`, and hit the
API with some `curl` commands. All available API endpoints
with sample data will be written at a later time with an
auto-generating documentation. But in the meantime, just
take a peek inside the `controllers/` and get to know the
stack.

### Locally (with Docker)

```bash
# Rebuilds the image every time
yarn up:b

# Simply starts the services without a rebuild
yarn up
```

<!--
### CI

Documentation not written yet

### Deployments

Documentation not written yet
-->

## Features and requirements

### Stack

* TypeScript
  * Hapi (HTTP API server)
    * Joi (endpoint validation)
  * Objection (database ORM)
    * knex (SQL query builder)
  * jsonwebtokens (authentication)
  * Nodemon (development server watcher)
* PostgreSQL

### Directory structure

All of the project lives in the `src/` directory. Anything
top-level should be purely project configuration.

```bash
src/
  config/            # application configuration
  controllers/       # core endpoint functionality (uses methods from `lib`)
    subjects/        # same subject names as in `lib/`
      verb.ts        # the endpoint itself
  lib/               # core services and validators
    subjects/        # always plural: `users`, `roles`, etc.
      service.ts     # exports SubjectsService class (all controller methods are static)
      verb/          # get, put, post, patch, delete, etc. (add as many verb directories as needed)
        validator.ts # Joi validator used in controller validate options (only one per verb)
  migrations/        # database migrations, of course
  models/            # model schemas and relation mappings (don't use Objection validation)
  index.ts           # application entry point
```

Replicate this process as many times as needed to add new
controller methods, validators, models, tables, etc. Any
file or folder name that does not have a matching name
elsewhere, consider its name to be literal (e.g.
`validator.ts` or `service.ts`). For the `verb.ts`, replace
the name with the validator you are attempting to utilize
(e.g. `get.ts`, `put.ts`, `post.ts`, etc.) for the
controller you're bootstrapping to an endpoint.

The only exception to the naming convention is this: there
is no authentication controller of any kind, but the
`sessions` controller is the bridge to authentication. So,
why put the authentication service alongside other core
services when this isn't being used? Think of this as
mostly an internal service that isn't exposed to the
outside.

### Styleguide

#### `_d`

Any function that ends in `_d` is _destructive_. A simple
example of this is from `index.ts`, where an abstraction
was made in order to clean up the code. Because this
function extends the capability of an instance of the
`Server` object, I have made a distinction in the name to
let future engineers know that this function is destructive.
