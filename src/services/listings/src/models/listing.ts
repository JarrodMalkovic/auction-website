import { ListingStatus } from '@jjmauction/common';
import { DataTypes, Sequelize, UUIDV4, BuildOptions, Model } from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

export interface ListingAttributes {
  createdAt?: Date;
  slug?: string;
  id?: string;
  currentPrice: number;
  status?: ListingStatus;
  expiresAt: Date;
  startPrice: number;
  currentWinnerId?: string;
  userId: string;
  title: string;
  description: string;
  imageId: string;
  smallImage: string;
  largeImage: string;
}

export interface ListingModel
  extends Model<ListingAttributes>,
    ListingAttributes {}

export class Listing extends Model<ListingModel, ListingAttributes> {}

export type ListingStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ListingModel;
};

const ListingFactory = (sequelize: Sequelize): ListingStatic => {
  const Listing = <ListingStatic>sequelize.define(
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
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        defaultValue: ListingStatus.Active,
        values: Object.values(ListingStatus),
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
      imageId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      smallImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      largeImage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      indexes: [{ type: 'FULLTEXT', name: 'text_idx', fields: ['title'] }],
      version: true,
    }
  );

  SequelizeSlugify.slugifyModel(Listing, {
    source: ['title'],
  });

  return Listing;
};

export { ListingFactory };
