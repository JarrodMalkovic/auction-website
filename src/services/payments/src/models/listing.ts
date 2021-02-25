import { ListingStatus } from '@jjmauction/common';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';

export interface ListingAttributes {
  id: string;
  status?: ListingStatus;
  amount: number;
  winnerId: string;
  version?: number;
}

export interface ListingModel
  extends Model<ListingAttributes>,
    ListingAttributes {}

export class Listing extends Model<ListingModel, ListingAttributes> {}

export type ListingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ListingModel;
};

const ListingFactory = (sequelize: Sequelize): ListingStatic => {
  return <ListingStatic>sequelize.define(
    'listings',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      winnerId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        defaultValue: ListingStatus.Active,
        values: Object.values(ListingStatus),
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      version: true,
    }
  );
};

export { ListingFactory };
