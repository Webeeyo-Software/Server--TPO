import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NotificationAttributes {
  id: string;
  user_id: string;
  message: string;
  is_read?: boolean;
  created_at?: Date;
  is_deleted?: boolean;
}

type NotificationCreationAttributes = Optional<NotificationAttributes, 'id' | 'is_read' | 'created_at' | 'is_deleted'>;

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: string;
  public user_id!: string;
  public message!: string;
  public is_read?: boolean;
  public created_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    Notification.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  }
}

export const NotificationFactory = (sequelize: Sequelize) => {
  Notification.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false },
      message: { type: DataTypes.TEXT, allowNull: false },
      is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { tableName: 'Notifications', sequelize, timestamps: false }
  );
  return Notification;
};
