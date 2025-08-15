import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface DocumentTypeAttributes {
  id: string;
  type_name: string;
}

type DocumentTypeCreationAttributes = Optional<DocumentTypeAttributes, 'id'>;

export class DocumentType extends Model<DocumentTypeAttributes, DocumentTypeCreationAttributes> implements DocumentTypeAttributes {
  public id!: string;
  public type_name!: string;
}

export const DocumentTypeFactory = (sequelize: Sequelize) => {
  DocumentType.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      type_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    { tableName: 'DocumentTypes', sequelize, timestamps: false }
  );
  return DocumentType;
};
