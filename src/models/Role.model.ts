import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface RoleAttributes {
  role_id: string; 
  role_name: string;
}

interface RoleCreationAttributes
  extends Optional<RoleAttributes, "role_id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Role
    extends Model<RoleAttributes, RoleCreationAttributes>
    implements RoleAttributes
  {
    public role_id!: string;
    public role_name!: string;

    static associate(models: any) {
        Role.hasOne(models.UserRole, {
          foreignKey: "role_id",
          as: "userRole",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }

  Role.init(
    {
      role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles", 
      freezeTableName: true, 
      timestamps: false, 
    }
  );

  return Role;
};