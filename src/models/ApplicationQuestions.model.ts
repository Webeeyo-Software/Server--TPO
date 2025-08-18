import {Sequelize,Model,DataTypes, Optional} from 'sequelize';
interface ApplicationQuestionAttributes{
    id: string;
    applicationId: string;
    question: Text;
    answer: Text;
    isDeleted?: boolean;
}

interface ApplicationQuestionCreationAttributes extends Optional<ApplicationQuestionAttributes, 'id'> {}

module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class ApplicationQuestions extends Model<ApplicationQuestionAttributes, ApplicationQuestionCreationAttributes> implements ApplicationQuestionAttributes {
        public id!: string;
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
            id: {
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
            tableName: 'ApplicationQuestions',
            modelName: 'ApplicationQuestions',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    return ApplicationQuestions;
};