import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface NotificationsAttributes {
  id: string;
  userId: string;
  message: string;
  isRead?: boolean;
  createdAt?: Date;
  isDeleted?: boolean;
}

interface NotificationsCreationAttributes
  extends Optional<
    NotificationsAttributes,
    "id" | "isRead" | "createdAt" | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Notifications
    extends Model<NotificationsAttributes, NotificationsCreationAttributes>
    implements NotificationsAttributes
  {
    public id!: string;
    public userId!: string;
    public message!: string;
    public isRead?: boolean;
    public createdAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Notifications.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });     
    }
  }

  Notifications.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Notifications",
      tableName: "Notifications",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return Notifications;
};
