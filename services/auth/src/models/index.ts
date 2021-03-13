import { Sequelize } from 'sequelize';

import { UserFactory } from './user';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize('mysql', 'root', process.env.MYSQL_ROOT_PASSWORD, {
        host: 'auth-mysql-srv',
        dialect: 'mysql',
      });

const User = UserFactory(db);

export { db, User };
