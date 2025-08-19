import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type FeedbackTypeAttributes = {
  id: string;
  typeName: string;
  description?: string;
  isdeleted?: boolean | false;
  createdat?: Date;
};
interface FeedbackTypeCreationAttributes
  extends Optional<FeedbackTypeAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class FeedbackTypes
    extends Model<FeedbackTypeAttributes, FeedbackTypeCreationAttributes>
    implements FeedbackTypeAttributes
  {
    public id!: string;
    public typeName!: string;
    public description?: string;
    public isDeleted!: boolean | false;
    public readonly createdAt?: Date;

    static associate(models: any) {
      FeedbackTypes.hasMany(models.Feedback, {
        foreignKey: "FeedbackTypesId",
        as: "FeedbackId",
      });
    }
  }

  FeedbackTypes.init(
    {
      id: {
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
    }
  );

  return FeedbackTypes;
};
