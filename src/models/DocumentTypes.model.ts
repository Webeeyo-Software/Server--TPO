import { Model, Sequelize, Optional } from "sequelize";

interface DocumentTypesAttributes {
  id: string;
  typeName: string;
}

interface DocumentTypesCreationAttributes
  extends Optional<DocumentTypesAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class DocumentTypes
    extends Model<DocumentTypesAttributes, DocumentTypesCreationAttributes>
    implements DocumentTypesAttributes
  {
    public id!: string;
    public typeName!: string;

    static associate(models: any) {
      DocumentTypes.hasMany(models.Documents, {
        foreignKey: "typeId",
        as: "documents",
      });
    }
  }

  DocumentTypes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      typeName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "DocumentTypes",
      tableName: "DocumentTypes",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return DocumentTypes;
};
