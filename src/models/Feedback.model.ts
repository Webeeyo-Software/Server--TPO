import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface FeedbackAttributes {
  id: string;
  submittedBy: string;
  submittedFor: string;
  feedbackTypeId: string;
  rating: number;
  comments?: string;
  createdAt?: Date;
  isDeleted?: boolean;
}

interface FeedbackCreationAttributes
  extends Optional<FeedbackAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class Feedback
    extends Model<FeedbackAttributes, FeedbackCreationAttributes>
    implements FeedbackAttributes
  {
    public id!: string;
    public submittedBy!: string;
    public submittedFor!: string;
    public feedbackTypeId!: string;
    public rating!: number;
    public comments?: string;
    public createdAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Feedback.belongsTo(models.Users, {
        foreignKey: "submittedBy",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Feedback.belongsTo(models.Users, {
        foreignKey: "submittedFor",
        as: "users",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Feedback.belongsTo(models.FeedbackTypes, {
        foreignKey: "feedbackTypeId",
        as: "feedbackType",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  Feedback.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      submittedBy: { type: DataTypes.UUID, allowNull: false },
      submittedFor: { type: DataTypes.UUID, allowNull: false },
      feedbackTypeId: { type: DataTypes.UUID, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      comments: { type: DataTypes.TEXT },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Feedback",
      tableName: "Feedback",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Feedback;
};
