import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface RolesAttributes {
  id: string; 
  roleName: string;
}

interface RolesCreationAttributes
  extends Optional<RolesAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Roles
    extends Model<RolesAttributes, RolesCreationAttributes>
    implements RolesAttributes
  {
    public id!: string;
    public roleName!: string;

    static associate(models: any) {
        Roles.hasOne(models.UserRole, {
          foreignKey: "roleId",
          as: "userRole",
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
    }
  }

  Roles.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      roleName: {
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
      modelName: "Roles",
      tableName: "roles", 
      freezeTableName: true, 
      timestamps: false, 
    }
  );

  return Roles;
};