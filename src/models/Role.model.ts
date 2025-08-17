import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface RoleAttributes {
  role_id: string;
  role_name: string;
}

export interface RoleCreationAttributes extends Optional<RoleAttributes, "role_id"> {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public role_id!: string;
  public role_name!: string;

  static associate(models: any) {
    if (models.UserRole) {
      Role.hasOne(models.UserRole, {
        foreignKey: "role_id",
        as: "userRole",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
}

export default function RoleFactory(sequelize: Sequelize): typeof Role {
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
}
