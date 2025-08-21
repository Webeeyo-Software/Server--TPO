import { Model, DataTypes, Optional, Sequelize } from "sequelize";
interface DriveTypeAttributes {
  id: string;
  driveTypeName: string;
}
interface DriveCreationAttributes extends Optional<DriveTypeAttributes, "id"> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class DriveTypes
    extends Model<DriveTypeAttributes, DriveCreationAttributes>
    implements DriveTypeAttributes
  {
    public id!: string;
    public driveTypeName!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
      DriveTypes.hasMany(models.PlacementDrives, {
        foreignKey: "driveTypeId",
        as: "placementDrives",
      });
       DriveTypes.hasMany(models.TPORegistrations, {
        foreignKey: "driveTypeId",
        as: "TPORegistrations",
      });
    }
  }
  DriveTypes.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      driveTypeName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "DriveTypes",
      tableName: "DriveTypes",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return DriveTypes;
};
