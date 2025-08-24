import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface ExaminationDetailsAttributes {
  id: string;
  registrationNo: bigint; 
  academicYear: string;   
  semester: number;       
  cpi: number;            
  spi: number;           
  deadBacklog: number;
  activeBacklog: number;
  backlogName?: string | null;
  action?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ExaminationDetailsCreationAttributes
  extends Optional<ExaminationDetailsAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class ExaminationDetails
    extends Model<
      ExaminationDetailsAttributes,
      ExaminationDetailsCreationAttributes
    >
    implements ExaminationDetailsAttributes
  {
    public id!: string;
    public registrationNo!: bigint;
    public academicYear!: string;
    public semester!: number;
    public cpi!: number;
    public spi!: number;
    public deadBacklog!: number;
    public activeBacklog!: number;
    public backlogName?: string | null;
    public action?: string | null;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    static associate(models: any) {
    ExaminationDetails.belongsTo(models.StudentProfiles, {
        foreignKey: "registrationNo",
        as: "studentProfiles",
        
      });
    }
  }

  ExaminationDetails.init(
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
      academicYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      semester: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      cpi: {
        type: DataTypes.DECIMAL(4, 2), 
        allowNull: false,
      },
      spi: {
        type: DataTypes.DECIMAL(4, 2),
        allowNull: false,
      },
      
      deadBacklog: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      activeBacklog: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      backlogName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      action: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ExaminationDetails",
      tableName: "ExaminationDetails",
      timestamps: true,
    }
  );

  return ExaminationDetails;
};
