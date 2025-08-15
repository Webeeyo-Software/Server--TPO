import { Model, Optional, Sequelize, DataTypes } from 'sequelize';

interface ApplicationStatusAttributes {
  status_id: string;
  status_name: string;
}

interface ApplicationStatusCreationAttributes extends Optional<ApplicationStatusAttributes, 'status_id'> {}

module.exports = (sequelize: Sequelize) => {
  class ApplicationStatus
    extends Model<ApplicationStatusAttributes, ApplicationStatusCreationAttributes>
    implements ApplicationStatusAttributes
  {
    public status_id!: string;
    public status_name!: string;

    static associate(models: any) {
       ApplicationStatus.hasMany(models.Application, { foreignKey: 'status_id', as: 'applications' });
    }
  }

  ApplicationStatus.init(
    {
      status_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      status_name: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
      },
    },
    { sequelize, modelName: 'ApplicationStatus', tableName: 'ApplicationStatuses', timestamps: false }
  );

  return ApplicationStatus;
};
