import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NoticeAttributes {
  id: string;
  title: string;
  description: string;
  created_by: string;
  pdf_url?: string;
  created_at?: Date;
  is_deleted?: boolean;
}

interface NoticeCreationAttributes extends Optional<NoticeAttributes, 'id' | 'created_at' | 'pdf_url' | 'is_deleted'> {}

export class Notice extends Model<NoticeAttributes, NoticeCreationAttributes> implements NoticeAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public created_by!: string;
  public pdf_url?: string;
  public created_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    Notice.hasMany(models.NoticeRead, { foreignKey: 'notice_id', as: 'reads' });
    Notice.hasMany(models.NoticeAttachment, { foreignKey: 'notice_id', as: 'attachments' });
  }
}

export const initNoticeModel = (sequelize: Sequelize) => {
  Notice.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      created_by: { type: DataTypes.UUID, allowNull: false },
      pdf_url: { type: DataTypes.TEXT, allowNull: true },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { tableName: 'Notices', sequelize, timestamps: false }
  );
  return Notice;
};
