import { Sequelize } from 'sequelize';
import { ListingFactory } from './listing';
import { UserFactory } from './user';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize('mysql', 'root', 'password', {
        host: 'listings-mysql-srv',
        dialect: 'mysql',
      });

const Listing = ListingFactory(db);
const User = UserFactory(db);

User.hasMany(Listing);
Listing.belongsTo(User);

export { db, Listing, User };
