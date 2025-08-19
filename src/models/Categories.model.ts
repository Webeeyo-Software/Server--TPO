import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface CategoryAttributes {
  id: string;
  categoryName: string;
  isDeleted?: boolean;
  createdAt?: Date;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id" | "isDeleted" | "createdAt"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Categories
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
  {
    public id!: string;
    public categoryName!: string;
    public isDeleted?: boolean;
    public readonly createdat?: Date;

    static associate(models: any) {
      Categories.hasOne(models.StudentProfiles, {
        foreignKey: "categoriesId",
        as: "studentProfiles",
      });
    }
  }
  Categories.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categoryName: {
        type: DataTypes.ENUM("OPEN", "OBC", "SC", "ST", "NT", "EWS"),
        allowNull: false,
        unique: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Categories",
      tableName: "Categories",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return Categories;
};
