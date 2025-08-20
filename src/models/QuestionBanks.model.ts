import { Model, DataTypes, Sequelize, Optional } from "sequelize";

interface QuestionBankAttributes {
    id: string;
    companyId: string;
    question: string;
    answer?: string;
    options?: string[];
    createdAt?: Date;
    updatedAt?: Date;
}

type QuestionBankCreationAttributes = Optional<QuestionBankAttributes, "id">;

export class QuestionBank
    extends Model<QuestionBankAttributes, QuestionBankCreationAttributes>
    implements QuestionBankAttributes {
    public id!: string;
    public companyId!: string;
    public question!: string;
    public answer?: string;
    public options?: string[];
    public createdAt?: Date;
    public updatedAt?: Date;

    static associate(models: any) {
        QuestionBank.belongsTo(models.Companies, {
            foreignKey: "companyId",
            as: "company",
        });
    }
}

export default (sequelize: Sequelize) => {
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
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: true,
            },
        },
        {
            sequelize,
            tableName: "QuestionBank",
            timestamps: true,
        }
    );

    return QuestionBank;
};