import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface StudentProfilesAttributes {
  registrationNo: bigint;
  userId: string;
  fname: string;
  mname?: string;
  lname: string;
  email:string;
  gender: "Male" | "Female" | "Other";
  dob: Date;
  mobile: string;
  
  deptId?: string;
  year: "FE" | "SE" | "TE" | "BE";
  bgId?: string;
  aadharNumber: string;
  nationalityId?: string;
  religionId?: string;
  categoryId?: string;
  guardianName: string;
  guardianContact: string;
  admissionDate: Date;
  linkedin?: string;
  github?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}

export interface StudentProfilesCreationAttributes
  extends Optional<
    StudentProfilesAttributes,
    | "registrationNo"
    | "mname"
    | "linkedin"
    | "github"
    | "createdAt"
    | "updatedAt"
    | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class StudentProfiles
    extends Model<StudentProfilesAttributes, StudentProfilesCreationAttributes>
    implements StudentProfilesAttributes
  {
    public registrationNo!: bigint;
    public userId!: string;
    public fname!: string;
    public mname?: string;
    public lname!: string;
    public email!: string;
    public gender!: "Male" | "Female" | "Other";
    public dob!: Date;
    public mobile!: string;
    public deptId!: string;
    public year!: "FE" | "SE" | "TE" | "BE";
    public bgId!: string;
    public aadharNumber!: string;
    public nationalityId!: string;
    public religionId!: string;
    public categoryId!: string;
    public guardianName!: string;
    public guardianContact!: string;
    public admissionDate!: Date;
    public linkedin?: string;
    public github?: string;
    public createdAt?: Date;
    public updatedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      StudentProfiles.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "users",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.belongsTo(models.Departments, {
        foreignKey: "deptId",
        as: "departments",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.belongsTo(models.BloodGroups, {
        foreignKey: "bgId",
        as: "bloodGroups",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.belongsTo(models.Nationalities, {
        foreignKey: "nationalityId",
        as: "nationalities",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.belongsTo(models.Religions, {
        foreignKey: "religionId",
        as: "religions",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.belongsTo(models.Categories, {
        foreignKey: "categoryId",
        as: "categories",
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      });

      StudentProfiles.hasOne(models.AcademicDetails, {
        foreignKey: "registrationNo",
        as: "academicDetails",
      });
      StudentProfiles.hasMany(models.UploadCVS, {
        foreignKey: "registrationNo",
        as: "uploadCVS",
      });
    }
  }

  StudentProfiles.init(
    {
      registrationNo: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      mname: DataTypes.STRING(100),
      lname: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      gender: {
        type: DataTypes.ENUM("Male", "Female", "Other"),
        allowNull: false,
      },
      dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      mobile: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      
      deptId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      year: {
        type: DataTypes.ENUM("FE", "SE", "TE", "BE"),
        allowNull: false,
      },
      bgId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      aadharNumber: {
        type: DataTypes.CHAR(12),
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [12, 12],
        },
      },
      nationalityId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      religionId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      categoryId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      guardianName: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      guardianContact: {
        type: DataTypes.STRING(15),
        allowNull: false,
        validate: {
          isNumeric: true,
          len: [10, 15],
        },
      },
      admissionDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      linkedin: DataTypes.STRING(255),
      github: DataTypes.STRING(255),
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: DataTypes.DATE,
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "StudentProfiles",
      tableName: "StudentProfiles",
      timestamps: false,
    }
  );
  return StudentProfiles;
};