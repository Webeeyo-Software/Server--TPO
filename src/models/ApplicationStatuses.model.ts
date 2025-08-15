export default (sequelize: any, DataTypes: any) => {
    const ApplicationStatus = sequelize.define("ApplicationStatus", {
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        status_name: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        }
    }, {
        tableName: 'ApplicationStatuses',
        timestamps: false
    });

    return ApplicationStatus;
};
