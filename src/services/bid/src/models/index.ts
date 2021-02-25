import { Sequelize } from 'sequelize';

import { BidFactory } from './bid';
import { ListingFactory } from './listing';
import { UserFactory } from './user';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize('mysql', 'root', process.env.MYSQL_ROOT_PASSWORD, {
        host: 'bid-mysql-srv',
        dialect: 'mysql',
      });

const User = UserFactory(db);
const Bid = BidFactory(db);
const Listing = ListingFactory(db);

User.hasMany(Bid);
Listing.hasMany(Bid);
Bid.belongsTo(User);
Bid.belongsTo(Listing);

export { db, Bid, Listing, User };
