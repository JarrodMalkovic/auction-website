import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';

export interface BidAttributes {
  id?: string;
  listingId: string;
  userId: string;
  amount: number;
  createdAt?: Date;
}

export interface BidModel extends Model<BidAttributes>, BidAttributes {}

export class Bid extends Model<BidModel, BidAttributes> {}

export type BidStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BidModel;
};

const BidFactory = (sequelize: Sequelize): BidStatic => {
  return <BidStatic>sequelize.define(
    'bids',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      listingId: {
        type: DataTypes.UUID,
      },
      userId: {
        type: DataTypes.UUID,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      version: true,
    }
  );
};

export { BidFactory };
