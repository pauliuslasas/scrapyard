import Knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../../knexfile';

const knex = Knex(knexConfig);

Model.knex(knex);

export { Model };
