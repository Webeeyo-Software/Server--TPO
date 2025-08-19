import { Sequelize, Optional, Model, DataTypes } from "sequelize";
import { sequelize } from ".";
interface AttachmentAttributes {
  id: string;
  driveId: string;
  fileUrl: Text;
  type: "PDF" | "DOCX" | "IMAGE";
  uploadedAt?: Date;
  isDeleted?: boolean;
}
interface AttachmentCreationAttributes
  extends Optional<AttachmentAttributes, "id"> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Attachments
    extends Model<AttachmentAttributes, AttachmentCreationAttributes>
    implements AttachmentAttributes
  {
    public id!: string;
    public driveId!: string;
    public fileUrl!: Text;
    public type!: "PDF" | "DOCX" | "IMAGE";
    public uploadedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Attachments.belongsTo(models.PlacementDrives, {
        foreignKey: "driveId",
        as: "placementDrives",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Attachments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      driveId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("PDF", "DOCX", "IMAGE"),
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
      modelName: "Attachments",
      tableName: "Attachments",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return Attachments;
};
