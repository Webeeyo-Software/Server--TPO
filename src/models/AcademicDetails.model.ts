import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface AcademicDetailsAttributes {
  id: string;
  registrationNo: bigint;
  sscPercent?: number;
  sscBoard?: string;
  sscYear?: number;
  hscPercent?: number;
  hscBoard?: string;
  hscYear?: number;
  cgpa?: number;
  backlogs?: number;
  isDeleted?: boolean;
}

interface AcademicDetailsCreationAttributes
  extends Optional<
    AcademicDetailsAttributes,
    | "id"
    | "sscPercent"
    | "sscBoard"
    | "sscYear"
    | "hscPercent"
    | "hscBoard"
    | "hscYear"
    | "cgpa"
    | "backlogs"
    | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class AcademicDetails
    extends Model<AcademicDetailsAttributes, AcademicDetailsCreationAttributes>
    implements AcademicDetailsAttributes
  {
    public id!: string;
    public registrationNo!: bigint;
    public sscPercent?: number;
    public sscBoard?: string;
    public sscYear?: number;
    public hscPercent?: number;
    public hscBoard?: string;
    public hscYear?: number;
    public cgpa?: number;
    public backlogs?: number;
    public isDeleted?: boolean;

    static associate(models: any) {
      AcademicDetails.belongsTo(models.StudentProfiles, {
        foreignKey: "registrationNo",
        as: "studentProfiles",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }
  }

  AcademicDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      registrationNo: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
      sscPercent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      sscBoard: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      sscYear: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          min: 1900,
          max: new Date().getFullYear(),
        },
      },
      hscPercent: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
        validate: {
          min: 0,
          max: 100,
        },
      },
      hscBoard: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      hscYear: {
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
      isDeleted: {
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
    }
  );

  return AcademicDetails;
};
