import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface ApplicationStatusesAttributes {
  id: string;
  statusName: string;
}

interface ApplicationStatusesCreationAttributes
  extends Optional<ApplicationStatusesAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class ApplicationStatuses
    extends Model<
      ApplicationStatusesAttributes,
      ApplicationStatusesCreationAttributes
    >
    implements ApplicationStatusesAttributes
  {
    public id!: string;
    public statusName!: string;

    static associate(models: any) {
      ApplicationStatuses.hasMany(models.Applications, {
        foreignKey: "id",
        as: "applications",
      });
    }
  }

  ApplicationStatuses.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      statusName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "ApplicationStatuses",
      tableName: "ApplicationStatuses",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return ApplicationStatuses;
};
