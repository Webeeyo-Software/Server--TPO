
import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface CategoryAttributes {
  category_id: number;
  category_name: string;
  is_deleted?: boolean;
  created_at?: Date;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "category_id" | "is_deleted" | "created_at"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Category
    extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes
  {
    public category_id!: number;
    public category_name!: string;
    public is_deleted?: boolean;
    public readonly created_at?: Date;

    static associate(models: any) {
      Category.hasOne(models.StudentProfiles, {
        foreignKey: "category_id",
        as: "studentProfiles",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  Category.init(
    {
      category_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.ENUM("OPEN", "OBC", "SC", "ST", "NT", "EWS"),
        allowNull: false,
        unique: true,
      },
      is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "Categories",
      freezeTableName: true,
      timestamps: false,   
      underscored: true,   
    }
  );

  return Category;
};
