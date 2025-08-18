import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface ApplicationStatusesAttributes {
  statusId: string;
  statusName: string;
}

interface ApplicationStatusesCreationAttributes
  extends Optional<ApplicationStatusesAttributes, "statusId"> {}

module.exports = (sequelize: Sequelize) => {
  class ApplicationStatuses
    extends Model<ApplicationStatusesAttributes, ApplicationStatusesCreationAttributes>
    implements ApplicationStatusesAttributes
  {
    public statusId!: string;
    public statusName!: string;

    static associate(models: any) {
      ApplicationStatuses.hasMany(models.Applications, {
        foreignKey: "statusId",
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
      underscored: true,
    }
  );

  return ApplicationStatuses;
};
