import { Model, Sequelize, Optional } from "sequelize";

interface DocumentTypesAttributes {
  typeId: string;
  typeName: string;
}

interface DocumentTypesCreationAttributes
  extends Optional<DocumentTypesAttributes, "typeId"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class DocumentTypes
    extends Model<DocumentTypesAttributes, DocumentTypesCreationAttributes>
    implements DocumentTypesAttributes
  {
    public typeId!: string;
    public typeName!: string;

    static associate(models: any) {
      DocumentTypes.hasMany(models.Documents, {
        foreignKey: "typeId",
        as: "documents",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  DocumentTypes.init(
    {
      typeId: {
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
      underscored: true,
    }
  );

  return DocumentTypes;
};
