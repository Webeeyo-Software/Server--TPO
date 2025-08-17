import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface CompaniesAttributes {
  companies_id: string;
  name: string;
  user_id: string;
  description?: string;
  website?: string;
  email?: string;
  contact_number?: string;
  location?: string;
  logo_url?: string;
  status?: "Active" | "Inactive";
  created_at?: Date;
  is_deleted?: boolean;
}

export type CompaniesCreationAttributes = Optional<
  CompaniesAttributes,
  "companies_id" | "status" | "created_at" | "is_deleted"
>;

export class Companies
  extends Model<CompaniesAttributes, CompaniesCreationAttributes>
  implements CompaniesAttributes
{
  declare companies_id: string;
  declare name: string;
  declare user_id: string;
  declare description?: string;
  declare website?: string;
  declare email?: string;
  declare contact_number?: string;
  declare location?: string;
  declare logo_url?: string;
  declare status: "Active" | "Inactive";
  declare created_at: Date;
  declare is_deleted: boolean;

  declare placementDrives?: any[];

  static associate(models: any) {
    if (models.User) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }

    if (models.PlacementDrives) {
      this.hasMany(models.PlacementDrives, {
        foreignKey: "companies_id",
        as: "placementDrives",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
}

export default function initCompanies(sequelize: Sequelize): typeof Companies {
  Companies.init(
    {
      companies_id: {
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
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: { model: "Users", key: "id" },
      },
      description: { type: DataTypes.TEXT },
      website: { type: DataTypes.STRING(150) },
      email: { type: DataTypes.STRING(150) },
      contact_number: { type: DataTypes.STRING(15) },
      location: { type: DataTypes.STRING(100) },
      logo_url: { type: DataTypes.TEXT },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        defaultValue: "Active",
      },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
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
}
