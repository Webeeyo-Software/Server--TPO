import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface DocumentTypeAttributes {
  id: string;
  type_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DocumentTypeCreationAttributes extends Optional<DocumentTypeAttributes, 'id'> {}

module.exports = (sequelize: Sequelize) => {
  class DocumentType extends Model<DocumentTypeAttributes, DocumentTypeCreationAttributes>
    implements DocumentTypeAttributes {
    public id!: string;
    public type_name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  DocumentType.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'DocumentType',
      tableName: 'DocumentTypes',
    }
  );

  return DocumentType;
};
