import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface DocumentAttributes {
  id: string;
  user_id: string;
  type_id: string;
  file_url: string;
  uploaded_at?: Date;
  is_deleted?: boolean;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'id' | 'uploaded_at' | 'is_deleted'> {}

module.exports = (sequelize: Sequelize) => {
  class Document
    extends Model<DocumentAttributes, DocumentCreationAttributes>
    implements DocumentAttributes
  {
    public id!: string;
    public user_id!: string;
    public type_id!: string;
    public file_url!: string;
    public uploaded_at?: Date;
    public is_deleted?: boolean;

    static associate(models: any) {
      Document.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Document.belongsTo(models.DocumentType, { foreignKey: 'type_id', as: 'documentType' });
    }
  }

  Document.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false },
      type_id: { type: DataTypes.UUID, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: false },
      uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: 'Document', tableName: 'Documents', timestamps: false }
  );

  return Document;
};
