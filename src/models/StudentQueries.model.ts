import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface StudentQueryAttributes {
  id: string;
  user_id: string;
  question: string;
  status: 'Pending' | 'Answered' | 'Closed';
  created_at?: Date;
  is_deleted?: boolean;
}

interface StudentQueryCreationAttributes extends Optional<StudentQueryAttributes, 'id' | 'created_at' | 'is_deleted'> {}

module.exports = (sequelize: Sequelize) => {
  class StudentQuery
    extends Model<StudentQueryAttributes, StudentQueryCreationAttributes>
    implements StudentQueryAttributes
  {
    public id!: string;
    public user_id!: string;
    public question!: string;
    public status!: 'Pending' | 'Answered' | 'Closed';
    public created_at?: Date;
    public is_deleted?: boolean;

    static associate(models: any) {
      StudentQuery.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      StudentQuery.hasMany(models.QueryResponse, { foreignKey: 'query_id', as: 'responses' });
    }
  }

  StudentQuery.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false },
      question: { type: DataTypes.TEXT, allowNull: false },
      status: { type: DataTypes.ENUM('Pending', 'Answered', 'Closed'), defaultValue: 'Pending' },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: 'StudentQuery', tableName: 'StudentQueries', timestamps: false }
  );

  return StudentQuery;
};
