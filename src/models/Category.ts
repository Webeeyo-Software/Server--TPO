import { Sequelize, DataTypes, Optional, Model } from "sequelize";

type CategoryAttributes = {
  category_id: number;
  category_name: string;
  is_deleted?: boolean | false;
  created_at?: Date;
};

interface CategoryCreationAttributes extends Optional<CategoryAttributes, "category_id"> {}

module.exports = (sequelize: Sequelize) => {
  class Category extends Model<CategoryAttributes, CategoryCreationAttributes>
    implements CategoryAttributes {
    public category_id!: number;
    public category_name!: string;
    public is_deleted!: boolean | false;
    public readonly created_at?: Date;

    static associate(models: any) {
    Category.hasMany(models.StudentProfiles, {
     foreignKey: "category_id", 
     as: "user_id"          
});
    }
  }

  Category.init(
    {
      category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.ENUM("OPEN", "OBC", "SC", "ST", "NT", "EWS"),
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
      modelName: "Category",
      tableName: "Categories",
      timestamps: false,
    }
  );

  return Category;
};