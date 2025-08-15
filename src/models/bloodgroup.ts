import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface BloodGroupAttributes {
  bg_id: string;
  blood_group: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BloodGroupCreationAttributes extends Optional<BloodGroupAttributes, 'bg_id'> {}

module.exports = (sequelize: Sequelize) => {
  class BloodGroup extends Model<BloodGroupAttributes, BloodGroupCreationAttributes>
    implements BloodGroupAttributes {
    public bg_id!: string;
    public blood_group!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  BloodGroup.init(
    {
      bg_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      blood_group: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'BloodGroup',
      tableName: 'BloodGroups',
    }
  );

  return BloodGroup;
};
