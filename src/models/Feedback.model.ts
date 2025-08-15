export default (sequelize: any, DataTypes: any) => {
    const Feedback = sequelize.define("Feedback", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        submitted_for: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comments: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'Feedback',
        timestamps: false
    });

    Feedback.associate = (models: any) => {
        Feedback.belongsTo(models.User, { foreignKey: 'submitted_by', as: 'submittedBy' });
        models.User.hasMany(Feedback, { foreignKey: 'submitted_by', as: 'feedbackGiven' });

        Feedback.belongsTo(models.FeedbackType, { foreignKey: 'feedback_type_id', as: 'feedbackType' });
        models.FeedbackType.hasMany(Feedback, { foreignKey: 'feedback_type_id', as: 'feedbacks' });
    };

    return Feedback;
};
