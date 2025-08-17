import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface AcademicDetailsAttributes {
  id: string;
  registration_no: bigint;
  ssc_percent?: number;
  ssc_board?: string;
  ssc_year?: number;
  hsc_percent?: number;
  hsc_board?: string;
  hsc_year?: number;
  cgpa?: number;
  backlogs?: number;
  is_deleted?: boolean;
}

export interface AcademicDetailsCreationAttributes
  extends Optional<
    AcademicDetailsAttributes,
    | "id"
    | "ssc_percent"
    | "ssc_board"
    | "ssc_year"
    | "hsc_percent"
    | "hsc_board"
    | "hsc_year"
    | "cgpa"
    | "backlogs"
    | "is_deleted"
  > {}

export class AcademicDetails
  extends Model<AcademicDetailsAttributes, AcademicDetailsCreationAttributes>
  implements AcademicDetailsAttributes
{
  public id!: string;
  public registration_no!: bigint;
  public ssc_percent?: number;
  public ssc_board?: string;
  public ssc_year?: number;
  public hsc_percent?: number;
  public hsc_board?: string;
  public hsc_year?: number;
  public cgpa?: number;
  public backlogs?: number;
  public is_deleted!: boolean;

  static associate(models: any) {
    if (models.StudentProfile) {
      AcademicDetails.belongsTo(models.StudentProfile, {
        foreignKey: "registration_no",
        as: "studentProfile",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }
}

export default function initAcademicDetails(
  sequelize: Sequelize
): typeof AcademicDetails {
  AcademicDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      registration_no: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: {
          model: "StudentProfiles", 
          key: "registration_no",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ssc_percent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      ssc_board: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      ssc_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      hsc_percent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      hsc_board: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      hsc_year: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      cgpa: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 10,
        },
      },
      backlogs: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 0,
        },
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "AcademicDetails",
      tableName: "AcademicDetails",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return AcademicDetails;
}
