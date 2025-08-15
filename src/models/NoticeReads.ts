import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NoticeReadAttributes {
  id: string;
  notice_id: string;
  user_id: string;
  read_at?: Date;
  is_deleted?: boolean;
}

type NoticeReadCreationAttributes = Optional<NoticeReadAttributes, 'id' | 'read_at' | 'is_deleted'>;

export class NoticeRead extends Model<NoticeReadAttributes, NoticeReadCreationAttributes> implements NoticeReadAttributes {
  public id!: string;
  public notice_id!: string;
  public user_id!: string;
  public read_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    NoticeRead.belongsTo(models.Notice, { foreignKey: 'notice_id', as: 'notice' });
  }
}

export const NoticeReadFactory = (sequelize: Sequelize) => {
  NoticeRead.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      notice_id: { type: DataTypes.UUID, allowNull: false },
      user_id: { type: DataTypes.UUID, allowNull: false },
      read_at: { type: DataTypes.DATE, allowNull: true },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { tableName: 'NoticeReads', sequelize, timestamps: false }
  );
  return NoticeRead;
};
