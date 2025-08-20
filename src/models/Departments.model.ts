import { Model, Sequelize, Optional } from "sequelize";

interface DepartmentsAttributes {
  id: string;
  deptName: string;
}

interface DepartmentsCreationAttributes
  extends Optional<DepartmentsAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Departments
    extends Model<DepartmentsAttributes, DepartmentsCreationAttributes>
    implements DepartmentsAttributes
  {
    public id!: string;
    public deptName!: string;

    static associate(models: any) {
      Departments.hasMany(models.StudentProfiles, {
        foreignKey: "deptId",
        as: "students",
      });
      Departments.hasMany(models.PlacementDrives, {
        foreignKey: "deptId",
        as: "placementDrives",
      });
    }
  }

  Departments.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      deptName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Departments",
      tableName: "Departments",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return Departments;
};
