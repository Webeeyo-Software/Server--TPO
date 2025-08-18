import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type ReligionAttributes = {
  religion_id: number;
  religion_name: string;
  is_deleted?: boolean | false;
  created_at?: Date;
};

interface ReligionCreationAttributes extends Optional<ReligionAttributes, "religion_id"> {}

module.exports = (sequelize: Sequelize) => {
  class Religion extends Model<ReligionAttributes, ReligionCreationAttributes>
    implements ReligionAttributes {
    public religion_id!: number;
    public religion_name!: string;
    public is_deleted!: boolean | false;
    public readonly created_at?: Date;

    static associate(models: any) {
  Religion.hasMany(models.StudentProfiles, {
     foreignKey: "religion_id", 
     as: "user_id"            // alias for association
});
    }
  }

  Religion.init(
    {
      religion_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      religion_name: {
        type: DataTypes.ENUM("Hindu", "Muslim", "Christian", "Buddha", "Other"),
        allowNull: false,
        unique: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Religion",
      tableName: "Religions",
      timestamps: false,
    }
  );

  return Religion;
};
