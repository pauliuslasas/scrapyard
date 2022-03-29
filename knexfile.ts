import Knex from 'knex';

export default {
  client: 'sqlite3',
  connection: {
    filename: './src/persistence/parts.db',
  },
  migrations: {
    directory: './src/persistence/migrations',
  },
  seeds: {
    directory: './src/persistence/seeds',
  },
  useNullAsDefault: true,
} as Knex.Config;
