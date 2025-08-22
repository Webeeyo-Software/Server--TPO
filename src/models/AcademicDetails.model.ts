import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface AcademicDetailsAttributes {
  id: string;
  registrationNo: bigint;

  // SSC
  sscPercent?: number;
  sscBoard?: string;
  sscInstitute?: string;
  sscYear?: number;

  // HSC
  hscPercent?: number;
  hscBoard?: string;
  hscInstitute?: string;
  hscYear?: number;

  // Diploma
  diplomaPercent?: number;
  diplomaBoard?: string;
  diplomaYear?: number;
  diplomaInstitute?: string;

  // Graduation
  graduationCPI?: number;
  graduationPercent?: number;
  graduationYear?: number;
  graduationInstitute?: string;
  graduationUniversity?: string;

  // Post-Graduation
  postGraduationCPI?: number;

  highestQualification?: string;

  // PAN Number (new)
  panNumber?: string;

  // Languages (new)
  languages?: string; // store as comma-separated string or JSON string

  // Year of Passing (new)
  yearOfPassing?: number;

  // Flags (toggle switches in UI)
  isDirectSecondYear?: boolean;
  isGoingForHigherStudies?: boolean;
  isInterestedOnlyInInternship?: boolean;

  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface AcademicDetailsCreationAttributes extends Optional<AcademicDetailsAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class AcademicDetails extends Model<AcademicDetailsAttributes, AcademicDetailsCreationAttributes> implements AcademicDetailsAttributes {
    public id!: string;
    public registrationNo!: bigint;

    public sscPercent?: number;
    public sscBoard?: string;
    public sscInstitute?: string;
    public sscYear?: number;

    public hscPercent?: number;
    public hscBoard?: string;
    public hscInstitute?: string;
    public hscYear?: number;

    public diplomaPercent?: number;
    public diplomaBoard?: string;
    public diplomaYear?: number;
    public diplomaInstitute?: string;

    public graduationCPI?: number;
    public graduationPercent?: number;
    public graduationYear?: number;
    public graduationInstitute?: string;
    public graduationUniversity?: string;

    public postGraduationCPI?: number;

    public highestQualification?: string;

    public panNumber?: string; // new attribute
    public languages?: string; // new attribute
    public yearOfPassing?: number; // new attribute

    public isDirectSecondYear?: boolean;
    public isGoingForHigherStudies?: boolean;
    public isInterestedOnlyInInternship?: boolean;

    public isDeleted?: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

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

      // SSC
      sscPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
      sscBoard: { type: DataTypes.STRING(100), allowNull: true },
      sscInstitute: { type: DataTypes.STRING(255), allowNull: true },
      sscYear: { type: DataTypes.INTEGER, allowNull: true },

      // HSC
      hscPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
      hscBoard: { type: DataTypes.STRING(100), allowNull: true },
      hscInstitute: { type: DataTypes.STRING(255), allowNull: true },
      hscYear: { type: DataTypes.INTEGER, allowNull: true },

      // Diploma
      diplomaPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
      diplomaBoard: { type: DataTypes.STRING(100), allowNull: true },
      diplomaInstitute: { type: DataTypes.STRING(255), allowNull: true },
      diplomaYear: { type: DataTypes.INTEGER, allowNull: true },

      // Graduation
      graduationCPI: { type: DataTypes.DECIMAL(4, 2), allowNull: true },
      graduationPercent: { type: DataTypes.DECIMAL(5, 2), allowNull: true },
      graduationYear: { type: DataTypes.INTEGER, allowNull: true },
      graduationInstitute: { type: DataTypes.STRING(255), allowNull: true },
      graduationUniversity: { type: DataTypes.STRING(255), allowNull: true },

      // Post-Graduation
      postGraduationCPI: { type: DataTypes.DECIMAL(4, 2), allowNull: true },

      highestQualification: { type: DataTypes.STRING(50), allowNull: true },

      // New attributes
      panNumber: { type: DataTypes.STRING(20), allowNull: true },
      languages: { type: DataTypes.STRING(255), allowNull: true }, // e.g. "English,Hindi,Spanish"
      yearOfPassing: { type: DataTypes.INTEGER, allowNull: true },

      // Toggles
      isDirectSecondYear: { type: DataTypes.BOOLEAN, defaultValue: false },
      isGoingForHigherStudies: { type: DataTypes.BOOLEAN, defaultValue: false },
      isInterestedOnlyInInternship: { type: DataTypes.BOOLEAN, defaultValue: false },

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
      timestamps: true,
    }
  );

  return AcademicDetails;
};
