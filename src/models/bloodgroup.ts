import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface BloodGroupAttributes {
  bg_id: string;
  blood_group: string;
}

type BloodGroupCreationAttributes = Optional<BloodGroupAttributes, 'bg_id'>;

export class BloodGroup extends Model<BloodGroupAttributes, BloodGroupCreationAttributes>
  implements BloodGroupAttributes {
  public bg_id!: string;
  public blood_group!: string;

  static associate(models: any) {
    BloodGroup.hasMany(models.StudentProfile, {
      foreignKey: 'bg_id',
      as: 'students',
    });
  }
}

export const BloodGroupFactory = (sequelize: Sequelize) => {
  BloodGroup.init(
    {
      bg_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      blood_group: { type: DataTypes.STRING(5), allowNull: false, unique: true },
    },
    { tableName: 'BloodGroups', sequelize, timestamps: false }
  );
  return BloodGroup;
};
