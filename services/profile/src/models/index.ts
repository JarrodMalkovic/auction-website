import { Sequelize } from 'sequelize';

import { ProfileFactory } from './profile';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:')
    : new Sequelize('mysql', 'root', process.env.MYSQL_ROOT_PASSWORD, {
        host: 'listings-mysql-srv',
        dialect: 'mysql',
      });

const Profile = ProfileFactory(db);

export { db, Profile };
