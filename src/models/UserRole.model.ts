import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface UserRoleAttributes {
  id: string;
  userId: string;
  roleId: string;
}

interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class UserRole
    extends Model<UserRoleAttributes, UserRoleCreationAttributes>
    implements UserRoleAttributes
  {
    public id!: string;
    public userId!: string;
    public roleId!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
        UserRole.belongsTo(models.Users, {
          foreignKey: "userId",
          as: "users",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
        UserRole.belongsTo(models.Roles, {
          foreignKey: "roleId",
          as: "roles",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }

  UserRole.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "UserRole",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return UserRole;
};