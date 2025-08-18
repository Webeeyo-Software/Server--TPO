import {Sequelize,Model,DataTypes, Optional} from 'sequelize';
interface ApplicationQuestionAttributes{
    question_id: number;
    application_id: number;
    question: Text;
    answer: Text;
    is_deleted?: boolean;
}

interface ApplicationQuestionCreationAttributes extends Optional<ApplicationQuestionAttributes, 'question_id'> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class ApplicationQuestion extends Model<ApplicationQuestionAttributes, ApplicationQuestionCreationAttributes> implements ApplicationQuestionAttributes {
        public question_id!: number;
        public application_id!: number;
        public question!: Text;
        public answer!: Text;
        public is_deleted?: boolean;

            static associate(models: any) {
                ApplicationQuestion.belongsTo(models.Application, {
                    foreignKey: 'application_id',
                    as: 'application',
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                });
            }
        }
    ApplicationQuestion.init(
        {
            question_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            application_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            question: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            answer: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            tableName: 'application_questions',
            modelName: 'ApplicationQuestion'
        }
    );

    return ApplicationQuestion;
};