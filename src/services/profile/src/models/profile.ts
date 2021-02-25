import { ListingStatus } from '@jjmauction/common';
import { BuildOptions, DataTypes, Model, Sequelize, UUIDV4 } from 'sequelize';

export interface ProfileAttributes {
  id?: string;
  userId: string;
  about: string;
  firstName: string;
  lastName: string;
  country: string;
  createdAt?: Date;
  version?: number;
}

export interface ProfileModel
  extends Model<ProfileAttributes>,
    ProfileAttributes {}

export class Profile extends Model<ProfileModel, ProfileAttributes> {}

export type ProfileStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProfileModel;
};

const ProfileFactory = (sequelize: Sequelize): ProfileStatic => {
  const Profile = <ProfileStatic>sequelize.define(
    'profiles',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        unique: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
      },
      about: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: { type: DataTypes.STRING, allowNull: false },
      lastName: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      version: true,
    }
  );

  return Profile;
};

export { ProfileFactory };
