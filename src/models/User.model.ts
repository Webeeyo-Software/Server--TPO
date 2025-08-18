import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import bcrypt from "bcryptjs";

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "created_at" | "updated_at" | "is_deleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes
  {
    public id!: string;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public created_at?: Date;
    public updated_at?: Date;
    public is_deleted?: boolean;

    static associate(models: any) {
      User.hasOne(models.UserRole, {
        foreignKey: "id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    public async isValidPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeSave: async (user: User) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return User;
};