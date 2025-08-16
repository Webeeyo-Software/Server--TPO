import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface UserRoleAttributes {
  user_role_id: string;
  user_id: string;
  role_id: string;
}

export interface UserRoleCreationAttributes
  extends Optional<UserRoleAttributes, "user_role_id"> {}

export class UserRole
  extends Model<UserRoleAttributes, UserRoleCreationAttributes>
  implements UserRoleAttributes
{
  public user_role_id!: string;
  public user_id!: string;
  public role_id!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  static associate(models: any) {
    if (models.User) {
      UserRole.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    if (models.Role) {
      UserRole.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
}


export default function initUserRole(sequelize: Sequelize): typeof UserRole {
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
        references: {
          model: "Users", 
          key: "id",
        },
      },
      role_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Roles", 
          key: "role_id",
        },
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "UserRoles",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
      indexes: [
        {
          unique: true,
          fields: ["user_id", "role_id"], 
        },
      ],
    }
  );

  return UserRole;
}
