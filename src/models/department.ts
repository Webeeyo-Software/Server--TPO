import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface DepartmentAttributes {
  dept_id: string;
  dept_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface DepartmentCreationAttributes extends Optional<DepartmentAttributes, 'dept_id'> {}

module.exports = (sequelize: Sequelize) => {
  class Department extends Model<DepartmentAttributes, DepartmentCreationAttributes>
    implements DepartmentAttributes {
    public dept_id!: string;
    public dept_name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Department.init(
    {
      dept_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      dept_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Department',
      tableName: 'Departments',
    }
  );

  return Department;
};
