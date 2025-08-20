import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface QuestionsAttributes {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  result?: string;
  companyId: string; // Foreign key for association with Companies
}

interface QuestionsCreationAttributes extends Optional<QuestionsAttributes, "id" | "result"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class Questions extends Model<QuestionsAttributes, QuestionsCreationAttributes> implements QuestionsAttributes {
    public id!: string;
    public questionText!: string;
    public options!: string[];
    public correctAnswer!: string;
    public result?: string;
    public companyId!: string;

    static associate(models: any) {
      // Link to Companies model (many questions belong to one company)
      Questions.belongsTo(models.Companies, {
        foreignKey: "companyId",
        as: "company",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });

      // Link to QuestionBank (a question can belong to many question banks via junction, or hasMany QuestionBank entries)
      Questions.hasMany(models.QuestionBank, {
        foreignKey: "questionId",
        as: "questionBank",
      });
    }
  }

  Questions.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      questionText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      options: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Questions",
      tableName: "Questions",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );

  return Questions;
};
