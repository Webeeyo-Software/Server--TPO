import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface DepartmentAttributes {
  dept_id: string;
  dept_name: string;
}

type DepartmentCreationAttributes = Optional<DepartmentAttributes, 'dept_id'>;

export class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes>
  implements DepartmentAttributes {
  public dept_id!: string;
  public dept_name!: string;

  static associate(models: any) {
    Department.hasMany(models.StudentProfile, {
      foreignKey: 'dept_id',
      as: 'students',
    });
  }
}

export const DepartmentFactory = (sequelize: Sequelize) => {
  Department.init(
    {
      dept_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      dept_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    { tableName: 'Departments', sequelize, timestamps: false }
  );
  return Department;
};
