import { ListingStatus } from '@jjmauction/common';
import { BuildOptions, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';

export interface ListingAttributes {
  id: string;
  status: ListingStatus;
  userId: string;
  expiresAt: Date;
  currentWinnerId?: string;
  slug: string;
  title: string;
  startPrice: number;
  currentPrice: number;
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
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      currentWinnerId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        defaultValue: ListingStatus.Active,
        values: Object.values(ListingStatus),
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      startPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currentPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      version: true,
    }
  );
};

export { ListingFactory };
