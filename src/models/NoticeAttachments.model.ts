import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface NoticeAttachmentsAttributes {
  id: string;
  noticeId: string;
  fileUrl: string;
  uploadedAt?: Date;
  isDeleted?: boolean;
}

interface NoticeAttachmentsCreationAttributes
  extends Optional<
    NoticeAttachmentsAttributes,
    "id" | "uploadedAt" | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class NoticeAttachments
    extends Model<
      NoticeAttachmentsAttributes,
      NoticeAttachmentsCreationAttributes
    >
    implements NoticeAttachmentsAttributes
  {
    public id!: string;
    public noticeId!: string;
    public fileUrl!: string;
    public uploadedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      NoticeAttachments.belongsTo(models.Notices, {
        foreignKey: "notice_id",
        as: "notices",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  NoticeAttachments.init(
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
      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      uploadedAt: {
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
      modelName: "NoticeAttachments",
      tableName: "NoticeAttachments",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return NoticeAttachments;
};
