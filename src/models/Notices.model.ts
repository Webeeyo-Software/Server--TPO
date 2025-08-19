import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface NoticesAttributes {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  pdfUrl?: string;
  createdAt?: Date;
  isDeleted?: boolean;
}

interface NoticesCreationAttributes
  extends Optional<
    NoticesAttributes,
    "id" | "createdAt" | "pdfUrl" | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Notices
    extends Model<NoticesAttributes, NoticesCreationAttributes>
    implements NoticesAttributes
  {
    public id!: string;
    public title!: string;
    public description!: string;
    public createdBy!: string;
    public pdfUrl?: string;
    public createdAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Notices.belongsTo(models.Users, {
        foreignKey: "createdBy",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Notices.hasMany(models.NoticeReads, {
        foreignKey: "noticeId",
        as: "reads",
      });
      Notices.hasMany(models.NoticeAttachments, {
        foreignKey: "noticeID",
        as: "attachments",
      });
    }
  }

  Notices.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: false },
      createdBy: { type: DataTypes.UUID, allowNull: false },
      pdfUrl: { type: DataTypes.TEXT, allowNull: true },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Notices",
      tableName: "Notices",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Notices;
};
