import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface BloodGroupsAttributes {
  id: string;
  bloodGroup: string;
}

interface BloodGroupsCreationAttributes
  extends Optional<BloodGroupsAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class BloodGroups
    extends Model<BloodGroupsAttributes, BloodGroupsCreationAttributes>
    implements BloodGroupsAttributes
  {
    public id!: string;
    public bloodGroup!: string;

    static associate(models: any) {
      BloodGroups.hasMany(models.StudentProfiles, {
        foreignKey: "bgId",
        as: "students",
      });
    }
  }

  BloodGroups.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      bloodGroup: {
        type: DataTypes.STRING(5),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "BloodGroups",
      tableName: "BloodGroups",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return BloodGroups;
};
