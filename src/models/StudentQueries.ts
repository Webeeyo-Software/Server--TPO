// models/StudentQuery.ts
export default (sequelize: any, DataTypes: any) => {
    const StudentQueries = sequelize.define("StudentQueries", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('Pending', 'Answered', 'Closed'),
            defaultValue: 'Pending'
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
        tableName: 'StudentQueries',
        timestamps: false
    });

    StudentQueries.associate = (models: any) => {
        StudentQueries.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        models.User.hasMany(StudentQueries, { foreignKey: 'user_id', as: 'queries' });
    };

    return StudentQueries;
};
