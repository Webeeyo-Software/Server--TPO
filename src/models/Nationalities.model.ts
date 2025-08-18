import { Model, Sequelize, Optional } from "sequelize";

interface NationalitiesAttributes {
  nationalityId: string;
  nationalityName: string;
}

interface NationalitiesCreationAttributes
  extends Optional<NationalitiesAttributes, "nationalityId"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Nationalities
    extends Model<NationalitiesAttributes, NationalitiesCreationAttributes>
    implements NationalitiesAttributes
  {
    public nationalityId!: string;
    public nationalityName!: string;

    static associate(models: any) {
      Nationalities.hasMany(models.StudentProfiles, {
        foreignKey: "nationalityId",
        as: "students",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Nationalities.init(
    {
      nationalityId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nationalityName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Nationalities",
      tableName: "Nationalities",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return Nationalities;
};
