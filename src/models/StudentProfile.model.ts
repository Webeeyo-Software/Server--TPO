import { Model, DataTypes, Optional, Sequelize } from "sequelize";

export interface StudentProfileAttributes {
  registration_no: bigint;
  user_id: string;
  fname: string;
  mname?: string;
  lname: string;
  gender: "Male" | "Female" | "Other";
  dob: Date;
  mobile: string;
  address: string;
  dept_id: string;
  year: "FE" | "SE" | "TE" | "BE";
  bg_id: string;
  aadhar_number: string;
  nationality_id: string;
  religion_id: string;
  category_id: string;
  guardian_name: string;
  guardian_contact: string;
  admission_date: Date;
  linkedin?: string;
  github?: string;
  created_at?: Date;
  updated_at?: Date;
  is_deleted?: boolean;
}

export interface StudentProfileCreationAttributes
  extends Optional<
    StudentProfileAttributes,
    | "registration_no"
    | "mname"
    | "linkedin"
    | "github"
    | "created_at"
    | "updated_at"
    | "is_deleted"
  > {}

export class StudentProfile
  extends Model<StudentProfileAttributes, StudentProfileCreationAttributes>
  implements StudentProfileAttributes
{
  public registration_no!: bigint;
  public user_id!: string;
  public fname!: string;
  public mname?: string;
  public lname!: string;
  public gender!: "Male" | "Female" | "Other";
  public dob!: Date;
  public mobile!: string;
  public address!: string;
  public dept_id!: string;
  public year!: "FE" | "SE" | "TE" | "BE";
  public bg_id!: string;
  public aadhar_number!: string;
  public nationality_id!: string;
  public religion_id!: string;
  public category_id!: string;
  public guardian_name!: string;
  public guardian_contact!: string;
  public admission_date!: Date;
  public linkedin?: string;
  public github?: string;
  public created_at?: Date;
  public updated_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    if (models.User) {
      StudentProfile.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });
    }

    if (models.Department) {
      StudentProfile.belongsTo(models.Department, {
        foreignKey: "dept_id",
        as: "department",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

    if (models.BloodGroup) {
      StudentProfile.belongsTo(models.BloodGroup, {
        foreignKey: "bg_id",
        as: "bloodGroup",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }
    if (models.Nationality) {
      StudentProfile.belongsTo(models.Nationality, {
        foreignKey: "nationality_id",
        as: "nationality",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

    if (models.Religion) {
      StudentProfile.belongsTo(models.Religion, {
        foreignKey: "religion_id",
        as: "religion",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

    if (models.Category) {
      StudentProfile.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      });
    }

    if (models.AcademicDetails) {
    StudentProfile.hasOne(models.AcademicDetails, {
      foreignKey: "registration_no",
      as: "academicDetails",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  }
  }
}

export default function initStudentProfile(
  sequelize: Sequelize
): typeof StudentProfile {
  StudentProfile.init(
    {
      registration_no: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        unique: true,
      },
      user_id: { type: DataTypes.UUID, allowNull: false },
      fname: { type: DataTypes.STRING(100), allowNull: false },
      mname: { type: DataTypes.STRING(100) },
      lname: { type: DataTypes.STRING(100), allowNull: false },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      dob: { type: DataTypes.DATEONLY, allowNull: false },
      mobile: { type: DataTypes.STRING(15), allowNull: false },
      address: { type: DataTypes.STRING(255), allowNull: false },
      dept_id: { type: DataTypes.UUID, allowNull: false },
      year: { type: DataTypes.ENUM("FE", "SE", "TE", "BE"), allowNull: false },
      bg_id: { type: DataTypes.UUID, allowNull: false },
      aadhar_number: { type: DataTypes.CHAR(12), allowNull: false },
      nationality_id: { type: DataTypes.UUID, allowNull: false },
      religion_id: { type: DataTypes.UUID, allowNull: false },
      category_id: { type: DataTypes.UUID, allowNull: false },
      guardian_name: { type: DataTypes.STRING(100), allowNull: false },
      guardian_contact: { type: DataTypes.STRING(15), allowNull: false },
      admission_date: { type: DataTypes.DATEONLY, allowNull: false },
      linkedin: { type: DataTypes.STRING(255) },
      github: { type: DataTypes.STRING(255) },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "StudentProfile",
      tableName: "StudentProfiles",
      timestamps: false,
    }
  );

  return StudentProfile;
}
