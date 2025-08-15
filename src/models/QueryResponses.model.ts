import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface QueryResponseAttributes {
  id: string;
  query_id: string;
  responder_id: string;
  response: string;
  responded_at?: Date;
  is_deleted?: boolean;
}

interface QueryResponseCreationAttributes extends Optional<QueryResponseAttributes, 'id' | 'responded_at' | 'is_deleted'> {}

module.exports = (sequelize: Sequelize) => {
  class QueryResponse
    extends Model<QueryResponseAttributes, QueryResponseCreationAttributes>
    implements QueryResponseAttributes
  {
    public id!: string;
    public query_id!: string;
    public responder_id!: string;
    public response!: string;
    public responded_at?: Date;
    public is_deleted?: boolean;

    static associate(models: any) {
      QueryResponse.belongsTo(models.StudentQuery, { foreignKey: 'query_id', as: 'query' });
      QueryResponse.belongsTo(models.User, { foreignKey: 'responder_id', as: 'responder' });
    }
  }

  QueryResponse.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      query_id: { type: DataTypes.UUID, allowNull: false },
      responder_id: { type: DataTypes.UUID, allowNull: false },
      response: { type: DataTypes.TEXT, allowNull: false },
      responded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: 'QueryResponse', tableName: 'QueryResponses', timestamps: false }
  );

  return QueryResponse;
};
