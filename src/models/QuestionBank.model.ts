import { Model, DataTypes, Sequelize, Optional } from "sequelize";
interface QuestionBankAttributes {
  id: string;
  companyId: string;
  round: string;       // e.g., "1", "2", "Aptitude"
  type: string;        // e.g., "Placement", "Internship"
  status: string;      // e.g., "Active", "Inactive"
}
interface QuestionBankCreationAttributes extends Optional<QuestionBankAttributes, "id"> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class QuestionBank extends Model<QuestionBankAttributes, QuestionBankCreationAttributes>
    implements QuestionBankAttributes {
    public id!: string;
    public companyId!: string;
    public round!: string;
    public type!: string;
    public status!: string;
    static associate(models: any) {
      QuestionBank.belongsTo(models.Companies, { foreignKey: "companyId", as: "company" });
      QuestionBank.belongsToMany(models.Questions, {
        through: models.QuestionBankQuestions,
        foreignKey: "questionBankId",
        otherKey: "questionId",
        as: "questions"
      });
    }
  }
  QuestionBank.init({
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    companyId: { type: DataTypes.UUID, allowNull: false },
    round: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize,
    modelName: "QuestionBank",
    tableName: "QuestionBank",
    freezeTableName: true,
    timestamps: false,
    underscored: true,
  });
  return QuestionBank;
};
