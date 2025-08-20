import { Sequelize } from "sequelize";

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  const QuestionBankQuestions = sequelize.define(
    "QuestionBankQuestions",
    {
      questionBankId: { type: DataTypes.UUID, allowNull: false, references: { model: "QuestionBank", key: "id" } },
      questionId: { type: DataTypes.UUID, allowNull: false, references: { model: "Questions", key: "id" } },
    },
    {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return QuestionBankQuestions;
};
