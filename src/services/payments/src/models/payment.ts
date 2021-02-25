import { BuildOptions, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';

export interface PaymentAttributes {
  id?: string;
  listingId: string;
  stripeId: string;
  version?: number;
}

export interface PaymentModel
  extends Model<PaymentAttributes>,
    PaymentAttributes {}

export class Payment extends Model<PaymentModel, PaymentAttributes> {}

export type PaymentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): PaymentModel;
};

const PaymentFactory = (sequelize: Sequelize): PaymentStatic => {
  return <PaymentStatic>sequelize.define(
    'payments',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      listingId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      stripeId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      version: true,
    }
  );
};

export { PaymentFactory };
