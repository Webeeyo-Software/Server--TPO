import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import bcrypt from "bcryptjs";

interface UsersAttributes {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

interface UsersCreationAttributes
  extends Optional<
    UsersAttributes,
    "id" | "createdAt" | "updatedAt" | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Users
    extends Model<UsersAttributes, UsersCreationAttributes>
    implements UsersAttributes
  {
    public id!: string;
    public email!: string;
    public password!: string;
    public firstName!: string;
    public lastName!: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      Users.hasOne(models.UserRole, {
        foreignKey: "userId",
        as: "userRoles",
      });
      Users.hasOne(models.StudentProfiles, {
        foreignKey: "userId",
        as: "studentProfiles",
      });
      Users.hasOne(models.Companies, {
        foreignKey: "userId",
        as: "companies",
      });
      Users.hasMany(models.PlacementDrives, {
        foreignKey: "postedBy",
        as: "placementDrives",
      });
      Users.hasMany(models.Notifications, {
        foreignKey: "userId",
        as: "notifications",
      });

      Users.hasMany(models.Notices, {
        foreignKey: "createdBy",
        as: "notices",
      });

      Users.hasMany(models.NoticeReads, {
        foreignKey: "userId",
        as: "noticeReads",
      });

      Users.hasMany(models.Applications, {
        foreignKey: "userId",
        as: "applications",
      });

      Users.hasMany(models.QueryResponses, {
        foreignKey: "responderId",
        as: "queryResponses",
      });

      Users.hasMany(models.StudentQueries, {
        foreignKey: "userId",
        as: "studentQueries",
      });

      Users.hasMany(models.TPORegistrations, {
        foreignKey: "userId",
        as: "TPORegistrations",
      });

      Users.hasMany(models.TPORegistrations, {
        foreignKey: "verifiedBy",
        as: "TPORegistration",
      });

      Users.hasMany(models.Feedback, {
        foreignKey: "submittedBy",
        as: "feedbacks",
      });

      Users.hasMany(models.Feedback, {
        foreignKey: "submittedFor",
        as: "feedback",
      });

      Users.hasMany(models.Documents, {
        foreignKey: "userId",
        as: "documents",
      });
    }

    public async isValidPassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }

  Users.init(
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
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Users",
      tableName: "Users",
      freezeTableName: true,
      timestamps: false,
      hooks: {
        beforeSave: async (user: Users) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );

  return Users;
};
