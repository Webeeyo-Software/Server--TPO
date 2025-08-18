import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type FeedbackTypeAttributes = {
  feedback_type_id: number;
  type_name: string;
  description?: string;
  is_deleted?: boolean | false;
  created_at?: Date;
};

interface FeedbackTypeCreationAttributes
  extends Optional<FeedbackTypeAttributes, "feedback_type_id"> {}

module.exports = (sequelize: Sequelize) => {
  class FeedbackType
    extends Model<FeedbackTypeAttributes, FeedbackTypeCreationAttributes>
    implements FeedbackTypeAttributes {
    public feedback_type_id!: number;
    public type_name!: string;
    public description?: string;
    public is_deleted!: boolean | false;
    public readonly created_at?: Date;

    static associate(models: any) {
  FeedbackType.hasMany(models.Feedback, {
     foreignKey: "feedback_type_id", 
     as: "id"        
});
    }
  }

  FeedbackType.init(
    {
      feedback_type_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "FeedbackType",
      tableName: "FeedbackTypes",
      timestamps: false,
    }
  );

  return FeedbackType;
};