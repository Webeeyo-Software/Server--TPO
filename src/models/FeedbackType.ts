import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type FeedbackTypeAttributes = {
  feedbackTypeId: number;
  typeName: string;
  description?: string;
  isdeleted?: boolean | false;
  createdat?: Date;
};

interface FeedbackTypeCreationAttributes
  extends Optional<FeedbackTypeAttributes, "feedbackTypeId"> {}

module.exports = (sequelize: Sequelize) => {
  class FeedbackTypes extends Model<FeedbackTypeAttributes, FeedbackTypeCreationAttributes>
    implements FeedbackTypeAttributes {
    public feedbackTypeId!: number;
    public typeName!: string;
    public description?: string;
    public isdeleted!: boolean | false;
    public readonly created_at?: Date;

    static associate(models: any) {
  FeedbackTypes.hasMany(models.Feedback, {
     foreignKey: "feedbackTypeId", 
     as: "id",   
     onDelete: "CASCADE",
     onUpdate: "CASCADE",     
});
    }
  }

  FeedbackTypes.init(
    {
      feedbackTypeId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      typeName: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdat: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "FeedbackTypes",
      tableName: "FeedbackTypes",
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );

  return FeedbackTypes;
};