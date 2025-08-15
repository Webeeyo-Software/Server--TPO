import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
interface ApplicationAttributes {
    application_id: number;
    user_id: number;
    drive_id: number;
    document_url: string;
    status_id: string;
    applied_at?: Date;
    updated_at?: Date;
}

interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'application_id'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class Application extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
        public application_id!: number;
        public user_id!: number;
        public drive_id!: number;
        public document_url!: string;
        public status_id!: string;
        public readonly created_at?: Date;
        public readonly updated_at?: Date;

        static associate(models: any) {
            Application.belongsTo(models.Users, {
                foreignKey: 'user_id',
                as: 'user'
            });
            Application.belongsTo(models.PlacementDrives, {
                foreignKey: 'drive_id',
                as: 'drive'
            });
            Application.hasMany(models.ApplicationQuestions, {
                foreignKey: 'status_id',
                as: 'ApplicationStatuses'
            });
        }
    }

    Application.init(
        {
            application_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            drive_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            document_url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            applied_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            sequelize,
            modelName: 'Application',
            tableName: 'Applications',
        }
    );

    return Application;
};
