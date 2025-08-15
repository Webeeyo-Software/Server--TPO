export default (sequelize: any, DataTypes: any) => {
    const QueryResponse = sequelize.define("QueryResponse", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        response: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        responded_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'QueryResponses',
        timestamps: false
    });

    QueryResponse.associate = (models: any) => {
        QueryResponse.belongsTo(models.StudentQueries, { foreignKey: 'query_id', as: 'query' });
        models.StudentQueries.hasMany(QueryResponse, { foreignKey: 'query_id', as: 'responses' });

        QueryResponse.belongsTo(models.User, { foreignKey: 'responder_id', as: 'responder' });
        models.User.hasMany(QueryResponse, { foreignKey: 'responder_id', as: 'responsesGiven' });
    };

    return QueryResponse;
};
