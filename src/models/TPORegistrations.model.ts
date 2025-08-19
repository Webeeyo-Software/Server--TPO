import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface TPORegistrationsAttributes {
  id: string;
  userId: string;
  verifiedBy?: string;
  verifiedAt?: Date;
  status?: "Pending" | "Verified" | "Rejected";
  isDeleted?: boolean;
}

interface TPORegistrationsCreationAttributes
  extends Optional<
    TPORegistrationsAttributes,
    "id" | "verifiedBy" | "verifiedAt" | "status" | "isDeleted"
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
    public isDeleted?: boolean;

    static associate(models: any) {
      TPORegistrations.belongsTo(models.Users, {
        foreignKey: "userId",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      TPORegistrations.belongsTo(models.Users, {
        foreignKey: "verifiedBy",
        as: "verifier",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
