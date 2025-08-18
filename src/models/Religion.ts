import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type ReligionAttributes = {
  religionId: string;
  religionName: string;
  isdeleted?: boolean | false;
  createdat?: Date;
};

interface ReligionCreationAttributes extends Optional<ReligionAttributes, "religionId"> {}

module.exports = (sequelize: Sequelize) => {
  class Religions extends Model<ReligionAttributes, ReligionCreationAttributes>
    implements ReligionAttributes {
    public religionId!: string;
    public religionName!: string;
    public isdeleted!: boolean | false;
    public readonly created_at?: Date;

    static associate(models: any) {
  Religions.hasOne(models.StudentProfiles, {
     foreignKey: "religionId", 
      as: "studentProfiles",   
        onDelete: "CASCADE",
        onUpdate: "CASCADE",            
});
    }
  }

  Religions.init(
    {
      religionId: {
        type: DataTypes.UUID,
       defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      religionName: {
        type: DataTypes.ENUM("Hindu", "Muslim", "Christian", "Buddha", "Other"),
        allowNull: false,
        unique: true,
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      createdat: {
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
