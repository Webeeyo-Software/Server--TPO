import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface FeedbackAttributes {
  id: string;
  submitted_by: string;
  submitted_for: string;
  feedback_type_id: string;
  rating: number;
  comments?: string;
  created_at?: Date;
  is_deleted?: boolean;
}

interface FeedbackCreationAttributes extends Optional<FeedbackAttributes, 'id' | 'created_at' | 'is_deleted'> {}

module.exports = (sequelize: Sequelize) => {
  class Feedback
    extends Model<FeedbackAttributes, FeedbackCreationAttributes>
    implements FeedbackAttributes
  {
    public id!: string;
    public submitted_by!: string;
    public submitted_for!: string;
    public feedback_type_id!: string;
    public rating!: number;
    public comments?: string;
    public created_at?: Date;
    public is_deleted?: boolean;

    static associate(models: any) {
      Feedback.belongsTo(models.User, { foreignKey: 'submitted_by', as: 'submittedBy' });
      Feedback.belongsTo(models.User, { foreignKey: 'submitted_for', as: 'submittedFor' });
      Feedback.belongsTo(models.FeedbackType, { foreignKey: 'feedback_type_id', as: 'feedbackType' });
    }
  }

  Feedback.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      submitted_by: { type: DataTypes.UUID, allowNull: false },
      submitted_for: { type: DataTypes.UUID, allowNull: false },
      feedback_type_id: { type: DataTypes.UUID, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comments: { type: DataTypes.TEXT },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    { sequelize, modelName: 'Feedback', tableName: 'Feedback', timestamps: false }
  );

  return Feedback;
};
