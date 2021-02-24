import { Sequelize } from 'sequelize';
import { ProfileFactory } from './profile';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize('mysql', 'root', 'password', {
        host: 'listings-mysql-srv',
        dialect: 'mysql',
      });

const Profile = ProfileFactory(db);

export { db, Profile };
