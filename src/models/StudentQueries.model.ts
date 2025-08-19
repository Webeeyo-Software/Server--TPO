import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface StudentQueriesAttributes {
  id: string;
  userId: string;
  question: string;
  status: "Pending" | "Answered" | "Closed";
  createdAt?: Date;
  isDeleted?: boolean;
}

interface StudentQueriesCreationAttributes
  extends Optional<StudentQueriesAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class StudentQueries
    extends Model<StudentQueriesAttributes, StudentQueriesCreationAttributes>
    implements StudentQueriesAttributes
  {
    public id!: string;
    public userId!: string;
    public question!: string;
    public status!: "Pending" | "Answered" | "Closed";
    public createdAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      StudentQueries.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      StudentQueries.hasMany(models.QueryResponses, {
        foreignKey: "queryId",
        as: "responses",
      });
    }
  }

  StudentQueries.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: { type: DataTypes.UUID, allowNull: false },
      question: { type: DataTypes.TEXT, allowNull: false },
      status: {
        type: DataTypes.ENUM("Pending", "Answered", "Closed"),
        defaultValue: "Pending",
      },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "StudentQueries",
      tableName: "StudentQueries",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return StudentQueries;
};
