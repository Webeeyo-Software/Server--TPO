import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface TPORegistrationsAttributes {
  id: string;
  userId: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  status?: "Pending" | "Verified" | "Rejected";
  driveTypeId: string; 
  academicYear: string;
  createdAt?: Date;
  isDeleted?: boolean;
}

interface TPORegistrationsCreationAttributes
  extends Optional<
    TPORegistrationsAttributes,
    | "id"
    | "verifiedBy"
    | "verifiedAt"
    | "status"
    | "createdAt"
    | "isDeleted"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class TPORegistrations
    extends Model<
      TPORegistrationsAttributes,
      TPORegistrationsCreationAttributes
    >
    implements TPORegistrationsAttributes
  {
    public id!: string;
    public userId!: string;
    public verifiedBy?: string;
    public verifiedAt?: Date;
    public status?: "Pending" | "Verified" | "Rejected";
    public driveTypeId!: string;   
    public academicYear!: string;
    public createdAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      TPORegistrations.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
        
      });

      TPORegistrations.belongsTo(models.Users, {
        foreignKey: "verifiedBy",
        as: "verifier",
       
      });

      TPORegistrations.belongsTo(models.DriveTypes, {
        foreignKey: "driveTypeId", 
        as: "driveType",
       
      });
    }
  }

  TPORegistrations.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      verifiedBy: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      verifiedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Verified", "Rejected"),
        defaultValue: "Pending",
      },
      driveTypeId: { 
        type: DataTypes.UUID,
        allowNull: false,
      },
      academicYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "TPORegistrations",
      tableName: "TPORegistrations",
      freezeTableName: true,
      timestamps: false,
    }
  );

  return TPORegistrations;
};
