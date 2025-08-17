import { Model, DataTypes, Optional, Sequelize } from "sequelize";
import bcrypt from "bcryptjs";

export interface UserAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

export type UserCreationAttributes = Optional<UserAttributes, "id" | "created_at" | "updated_at" | "is_deleted">;

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public created_at?: Date;
  public updated_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    if (!models.StudentProfile) console.error("StudentProfile model not found");
    else User.hasOne(models.StudentProfile, {
      foreignKey: "user_id",
      as: "studentProfile",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Notification) console.error("Notification model not found");
    else User.hasMany(models.Notification, {
      foreignKey: "user_id",
      as: "notifications",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Notice) console.error("Notice model not found");
    else User.hasMany(models.Notice, {
      foreignKey: "user_id",
      as: "notices",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.PlacementDrives) console.error("PlacementDrives model not found");
    else User.hasMany(models.PlacementDrives, {
      foreignKey: "user_id",
      as: "placementDrives",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Companies) console.error("Companies model not found");
    else User.hasMany(models.Companies, {
      foreignKey: "user_id",
      as: "companies",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.UserRole) console.error("UserRole model not found");
    else User.hasMany(models.UserRole, {
      foreignKey: "user_id",
      as: "userRoles",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.StudentQuery) console.error("StudentQuery model not found");
    else User.hasMany(models.StudentQuery, {
      foreignKey: "user_id",
      as: "studentQueries",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Feedback) console.error("Feedback model not found");
    else User.hasMany(models.Feedback, {
      foreignKey: "user_id",
      as: "feedbacks",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Document) console.error("Document model not found");
    else User.hasMany(models.Document, {
      foreignKey: "user_id",
      as: "documents",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.QueryResponse) console.error("QueryResponse model not found");
    else User.hasMany(models.QueryResponse, {
      foreignKey: "user_id",
      as: "queryResponses",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.NoticeRead) console.error("NoticeRead model not found");
    else User.hasMany(models.NoticeRead, {
      foreignKey: "user_id",
      as: "noticeReads",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    if (!models.Application) console.error("Application model not found");
    else User.hasMany(models.Application, {
      foreignKey: "user_id",
      as: "applications",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }

  public async isValidPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

export default function initUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
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
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING(100),
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
}
