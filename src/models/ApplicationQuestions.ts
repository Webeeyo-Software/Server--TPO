import {Sequelize,Model,DataTypes, Optional} from 'sequelize';
interface ApplicationQuestionAttributes{
    questionId: string;
    applicationId: string;
    question: Text;
    answer: Text;
    isDeleted?: boolean;
}

interface ApplicationQuestionCreationAttributes extends Optional<ApplicationQuestionAttributes, 'questionId'> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class ApplicationQuestions extends Model<ApplicationQuestionAttributes, ApplicationQuestionCreationAttributes> implements ApplicationQuestionAttributes {
        public questionId!: string;
        public applicationId!: string;
        public question!: Text;
        public answer!: Text;
        public isDeleted?: boolean;

            static associate(models: any) {
                ApplicationQuestions.belongsTo(models.Applications, {
                    foreignKey: 'applicationId',
                    as: 'applications',
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
            modelName: 'ApplicationQuestions',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    return ApplicationQuestions;
};