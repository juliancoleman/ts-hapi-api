# ts-hapi-api

## Installation

In order to use this API, simply fork the repo.

## Usage

```bash
BRANCH_NAME=your_branch_name docker-compose up -d
```

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
  test/              # this directory has been deprecated and will be removed in a later release
index.ts             # application entry point
```

Replicate this process as many times as needed to add new
controller methods, validators, models, tables, etc. Any
file or folder name that does not have a matching name
elsewhere, consider its name to be literal (e.g.
`validator.ts` or `service.ts`). For the `verb.ts`, replace
the name with the validator you are attempting to utilize
(e.g. `get.ts`, `put.ts`, `post.ts`, etc.) for the
controller you're bootstrapping to an endpoint.
