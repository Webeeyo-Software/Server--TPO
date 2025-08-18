import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface UserRoleAttributes {
  user_role_id: string;
  user_id: string;
  role_id: string;
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "user_role_id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserRole
    extends Model<UserRoleAttributes, UserRoleCreationAttributes>
    implements UserRoleAttributes
  {
    public user_role_id!: string;
    public user_id!: string;
    public role_id!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        UserRole.belongsTo(models.User, {
          foreignKey: "user_id",
          as: "user",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
        UserRole.belongsTo(models.Role, {
          foreignKey: "role_id",
          as: "role",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }

  UserRole.init(
    {
      user_role_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "UserRoles",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return UserRole;
};