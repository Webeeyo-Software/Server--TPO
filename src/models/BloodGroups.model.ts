import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface BloodGroupsAttributes {
  bgId: string;
  bloodGroup: string;
}

interface BloodGroupsCreationAttributes
  extends Optional<BloodGroupsAttributes, "bgId"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class BloodGroups
    extends Model<BloodGroupsAttributes, BloodGroupsCreationAttributes>
    implements BloodGroupsAttributes
  {
    public bgId!: string;
    public bloodGroup!: string;

    static associate(models: any) {
      BloodGroups.hasMany(models.StudentProfiles, {
        foreignKey: "bgId",
        as: "students",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  BloodGroups.init(
    {
      bgId: {
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
