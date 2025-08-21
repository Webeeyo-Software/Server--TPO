import { Sequelize, Optional, Model, DataTypes } from "sequelize";
interface ApplicationAttributes {
  id: string;
  userId: string;
  driveId: string;
  documentUrl: string;
  statusId: string;
  appliedAt?: Date;
  updatedAt?: Date;
}

interface ApplicationCreationAttributes
  extends Optional<ApplicationAttributes, "id"> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Applications
    extends Model<ApplicationAttributes, ApplicationCreationAttributes>
    implements ApplicationAttributes
  {
    public id!: string;
    public userId!: string;
    public driveId!: string;
    public documentUrl!: string;
    public statusId!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    static associate(models: any) {
      Applications.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",

      });
      Applications.belongsTo(models.PlacementDrives, {
        foreignKey: "driveId",
        as: "drives",

      });
      Applications.hasMany(models.ApplicationQuestions, {
        foreignKey: "applicationId",
        as: "ApplicationQuestions",
      });
      Applications.hasMany(models.OfferLetters, {
        foreignKey: "applicationId",
        as: "OfferLetters",
      });
      Applications.belongsTo(models.ApplicationStatuses, {
        foreignKey: "statusId",
        as: "status",

      });
    }
  }

  Applications.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      driveId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      documentUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      statusId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      appliedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Applications",
      tableName: "Applications",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Applications;
};
