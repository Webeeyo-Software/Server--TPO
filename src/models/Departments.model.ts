import { Model, Sequelize, Optional } from "sequelize";

interface DepartmentsAttributes {
  deptId: string;
  deptName: string;
}

interface DepartmentsCreationAttributes
  extends Optional<DepartmentsAttributes, "deptId"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Departments
    extends Model<DepartmentsAttributes, DepartmentsCreationAttributes>
    implements DepartmentsAttributes
  {
    public deptId!: string;
    public deptName!: string;

    static associate(models: any) {
      Departments.hasMany(models.StudentProfiles, {
        foreignKey: "deptId",
        as: "students",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Departments.init(
    {
      deptId: {
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
      underscored: true,
    }
  );

  return Departments;
};
