import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type ReligionAttributes = {
  id: string;
  religionName: string;
  isDeleted?: boolean | false;
  createdAt?: Date;
};

interface ReligionCreationAttributes
  extends Optional<ReligionAttributes, "id"> {}

module.exports = (sequelize: Sequelize) => {
  class Religions
    extends Model<ReligionAttributes, ReligionCreationAttributes>
    implements ReligionAttributes
  {
    public id!: string;
    public religionName!: string;
    public isDeleted!: boolean | false;
    public readonly createdAt?: Date;

    static associate(models: any) {
      Religions.hasOne(models.StudentProfiles, {
        foreignKey: "religionId",
        as: "studentProfiles",
      });
    }
  }
  Religions.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      religionName: {
        type: DataTypes.ENUM("Hindu", "Muslim", "Christian", "Buddha", "Other"),
        allowNull: false,
        unique: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Religions",
      tableName: "Religions",
      timestamps: false,
      freezeTableName: true,
      underscored: true,
    }
  );

  return Religions;
};
