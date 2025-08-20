import { Sequelize, DataTypes, Optional, Model } from "sequelize";

interface PlacementDrivesAttributes {
  id: string;
  companyId: string;
  position: string;
  driveDate: Date;
  postedBy: string;
  location: string;
  eligibilityCriteria: string; // Changed from Text to string
  jobDescription: string; // Changed from Text to string
  ctc: number;
  driveTypeId: string;
  applicationDeadline: Date;
  minpack?: number;
  maxpack?: number;
  appliedStatus?: boolean;
  deptId?: string;
  isDeleted?: boolean; // Removed 'false' string option
  createdAt?: Date;
  updatedAt?: Date; // Added updatedAt for consistency
}

interface PlacementDrivesCreationAttributes
  extends Optional<
    PlacementDrivesAttributes,
    "id" | "isDeleted" | "createdAt" | "updatedAt"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class PlacementDrives
    extends Model<PlacementDrivesAttributes, PlacementDrivesCreationAttributes>
    implements PlacementDrivesAttributes
  {
    public id!: string;
    public companyId!: string;
    public position!: string;
    public driveDate!: Date;
    public postedBy!: string;
    public location!: string;
    public eligibilityCriteria!: string;
    public jobDescription!: string;
    public ctc!: number;
    public driveTypeId!: string;
    public applicationDeadline!: Date;
    public minpack?: number;
    public maxpack?: number;
    public appliedStatus?: boolean;
    public deptId?: string;
    public isDeleted!: boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;

    static associate(models: any) {
      PlacementDrives.hasMany(models.Applications, {
        foreignKey: "driveId",
        as: "applications",
      });

      PlacementDrives.belongsTo(models.DriveTypes, {
        foreignKey: "driveTypeId",
        as: "driveType",
      });

      PlacementDrives.belongsTo(models.Companies, {
        foreignKey: "companyId",
        as: "company",
      });

      PlacementDrives.belongsTo(models.Users, {
        foreignKey: "postedBy",
        as: "postedByUser",
      });

      PlacementDrives.hasMany(models.Attachments, {
        foreignKey: "driveId",
        as: "attachments",
      });
    }
  }

  PlacementDrives.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Added missing defaultValue
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      position: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      driveDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      postedBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      eligibilityCriteria: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      jobDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      ctc: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      driveTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      applicationDeadline: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "PlacementDrives",
      tableName: "PlacementDrives",
      freezeTableName: true,
      timestamps: true, // Changed to true to match interface
    }
  );

  return PlacementDrives;
};
