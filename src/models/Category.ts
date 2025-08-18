
import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface CategoryAttributes {
  categoryId: number;
  categoryName: string;
  isdeleted?: boolean;
  createdat?: Date;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "categoryId" | "isdeleted" | "createdat"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Categories
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
  {
    public categoryId!: number;
    public categoryName!: string;
    public isdeleted?: boolean;
    public readonly createdat?: Date;

    static associate(models: any) {
      Categories.hasOne(models.StudentProfiles, {
        foreignKey: "categoryId",
        as: "studentProfiles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Categories.init(
    {
      categoryId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      categoryName: {
        type: DataTypes.ENUM("OPEN", "OBC", "SC", "ST", "NT", "EWS"),
        allowNull: false,
        unique: true,
      },
      isdeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdat: {
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
