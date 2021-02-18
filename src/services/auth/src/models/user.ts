import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
  id?: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const UserFactory = (sequelize: Sequelize): UserStatic => {
  return <UserStatic>sequelize.define('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
      primaryKey: true,
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
};

export { UserFactory };
