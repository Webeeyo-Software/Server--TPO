import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface CompaniesAttributes {
  id: string;
  name: string;
  userId: string;
  description?: string;
  website?: string;
  email?: string;
  contactNumber?: string;
  location?: string;
  logoUrl?: string;
  status?: "Active" | "Inactive";
  createdAt?: Date;
  isDeleted?: boolean;
}

type CompaniesCreationAttributes = Optional<
  CompaniesAttributes,
  "id" | "status" | "createdAt" | "isDeleted"
>;

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Companies
    extends Model<CompaniesAttributes, CompaniesCreationAttributes>
    implements CompaniesAttributes {
    public id!: string;
    public name!: string;
    public userId!: string;
    public description?: string;
    public website?: string;
    public email?: string;
    public contactNumber?: string;
    public location?: string;
    public logoUrl?: string;
    public status!: "Active" | "Inactive";
    public createdAt!: Date;
    public isDeleted!: boolean;

    public placementDrives?: any[];

    static associate(models: any) {
      Companies.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      Companies.hasMany(models.PlacementDrives, {
        foreignKey: "companyId",
        as: "placementDrives",
      });

      Companies.hasMany(models.QuestionBank, {
        foreignKey: "companyId",
        as: "questions",
      });
    }
  }

  Companies.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: { notEmpty: true },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      description: { type: DataTypes.TEXT },
      website: { type: DataTypes.STRING(150) },
      email: { type: DataTypes.STRING(150) },
      contactNumber: { type: DataTypes.STRING(15) },
      location: { type: DataTypes.STRING(100) },
      logoUrl: { type: DataTypes.TEXT },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
      createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Companies",
      tableName: "Companies",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return Companies;
};
