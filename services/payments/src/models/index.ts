import { Sequelize } from 'sequelize';

import { ListingFactory } from './listing';
import { PaymentFactory } from './payment';

const db =
  process.env.NODE_ENV == 'test'
    ? new Sequelize('sqlite::memory:', { logging: false })
    : new Sequelize('mysql', 'root', process.env.MYSQL_ROOT_PASSWORD, {
        host: 'bid-mysql-srv',
        dialect: 'mysql',
      });

const Listing = ListingFactory(db);
const Payment = PaymentFactory(db);

export { db, Listing, Payment };
