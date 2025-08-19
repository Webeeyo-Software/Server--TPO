import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface NoticeReadsAttributes {
  id: string;
  noticeId: string;
  userId: string;
  readAt?: Date;
  isDeleted?: boolean;
}

interface NoticeReadsCreationAttributes
  extends Optional<NoticeReadsAttributes, "id" | "readAt" | "isDeleted"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class NoticeReads
    extends Model<NoticeReadsAttributes, NoticeReadsCreationAttributes>
    implements NoticeReadsAttributes
  {
    public id!: string;
    public noticeId!: string;
    public userId!: string;
    public readAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      NoticeReads.belongsTo(models.Notices, {
        foreignKey: "noticeId",
        as: "notices",

      });
      NoticeReads.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",

      });
    }
  }

  NoticeReads.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      noticeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      readAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "NoticeReads",
      tableName: "NoticeReads",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return NoticeReads;
};
