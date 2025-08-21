import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface DocumentsAttributes {
  id: string;
  userId: string;
  typeId: string;
  fileUrl: string;
  uploadedAt?: Date;
  isDeleted?: boolean;
}

interface DocumentsCreationAttributes
  extends Optional<DocumentsAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class Documents
    extends Model<DocumentsAttributes, DocumentsCreationAttributes>
    implements DocumentsAttributes
  {
    public id!: string;
    public userId!: string;
    public typeId!: string;
    public fileUrl!: string;
    public uploadedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Documents.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Documents.belongsTo(models.DocumentTypes, {
        foreignKey: "typeId",
        as: "documentType",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Documents.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      typeId: { type: DataTypes.UUID, allowNull: false },
      fileUrl: { type: DataTypes.TEXT, allowNull: false },
      uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Documents",
      tableName: "Documents",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Documents;
};
