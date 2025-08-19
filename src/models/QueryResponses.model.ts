import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface QueryResponsesAttributes {
  id: string;
  queryId: string;
  responderId: string;
  response: string;
  respondedAt?: Date;
  isDeleted?: boolean;
}

interface QueryResponsesCreationAttributes
  extends Optional<QueryResponsesAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class QueryResponses
    extends Model<QueryResponsesAttributes, QueryResponsesCreationAttributes>
    implements QueryResponsesAttributes
  {
    public id!: string;
    public queryId!: string;
    public responderId!: string;
    public response!: string;
    public respondedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      QueryResponses.belongsTo(models.StudentQueries, {
        foreignKey: "queryId",
        as: "query",

      });
      QueryResponses.belongsTo(models.Users, {
        foreignKey: "responderId",
        as: "responder",

      });
    }
  }

  QueryResponses.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      queryId: { type: DataTypes.UUID, allowNull: false },
      responderId: { type: DataTypes.UUID, allowNull: false },
      response: { type: DataTypes.TEXT, allowNull: false },
      respondedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "QueryResponses",
      tableName: "QueryResponses",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return QueryResponses;
};
