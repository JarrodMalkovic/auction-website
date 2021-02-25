import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  createdAt?: Date;
  version?: number;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const UserFactory = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
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

export { UserFactory };
