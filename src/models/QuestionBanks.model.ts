import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface QuestionBankAttributes {
  id: string;
  companyId: string;
  question: string;
  answer?: string;
  options?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

interface QuestionBankCreationAttributes
  extends Optional<
    QuestionBankAttributes,
    "id" | "createdAt" | "updatedAt"
  > {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class QuestionBank
    extends Model<QuestionBankAttributes, QuestionBankCreationAttributes>
    implements QuestionBankAttributes
  {
    public id!: string;
    public companyId!: string;
    public question!: string;
    public answer?: string;
    public options?: string | null;
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models: any) {
      QuestionBank.belongsTo(models.Companies, {
        foreignKey: "companyId",
        as: "company",
      });
    }
  }

  QuestionBank.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      companyId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      question: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      answer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      options: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue("options");
          if (typeof rawValue === "string") {
            try {
              return JSON.parse(rawValue);
            } catch {
              return null;
            }
          }
          return rawValue ?? null;
        },
        set(val: string[] | null) {
          this.setDataValue("options", Array.isArray(val) ? JSON.stringify(val) : null);
        },
      },
    },
    {
      sequelize,
      modelName: "QuestionBank",
      tableName: "QuestionBank",
      freezeTableName: true,
      timestamps: true,
    }
  );

  return QuestionBank;
};
