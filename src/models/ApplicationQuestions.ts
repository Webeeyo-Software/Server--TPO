import {Sequelize,Model,DataTypes, Optional} from 'sequelize';
interface ApplicationQuestionAttributes{
    questionId: number;
    applicationId: number;
    question: Text;
    answer: Text;
    isDeleted?: boolean;
}

interface ApplicationQuestionCreationAttributes extends Optional<ApplicationQuestionAttributes, 'questionId'> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class ApplicationQuestions extends Model<ApplicationQuestionAttributes, ApplicationQuestionCreationAttributes> implements ApplicationQuestionAttributes {
        public questionId!: number;
        public applicationId!: number;
        public question!: Text;
        public answer!: Text;
        public isDeleted?: boolean;

            static associate(models: any) {
                ApplicationQuestions.belongsTo(models.Application, {
                    foreignKey: 'applicationId',
                    as: 'application',
                    onDelete: "CASCADE",
                    onUpdate: "CASCADE",
                });
            }
        }
    ApplicationQuestions.init(
        {
            questionId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            applicationId: {
                type: DataTypes.UUID,
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
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            sequelize,
            tableName: 'applicationQuestions',
            modelName: 'ApplicationQuestion',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    return ApplicationQuestions;
};