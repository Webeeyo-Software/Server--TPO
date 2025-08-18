import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
interface ApplicationAttributes {
    applicationId: number;
    userId: number;
    driveId: number;
    documentUrl: string;
    statusId: string;
    appliedAt?: Date;
    updatedAt?: Date;
}

interface ApplicationCreationAttributes extends Optional<ApplicationAttributes, 'applicationId'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class Applications extends Model<ApplicationAttributes, ApplicationCreationAttributes> implements ApplicationAttributes {
        public applicationId!: number;
        public userId!: number;
        public driveId!: number;
        public documentUrl!: string;
        public statusId!: string;
        public readonly createdAt?: Date;
        public readonly updatedAt?: Date;

        static associate(models: any) {
            Applications.belongsTo(models.Users, {
                foreignKey: 'userId',
                as: 'users',
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Applications.belongsTo(models.PlacementDrives, {
                foreignKey: 'driveId',
                as: 'drives',
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Applications.hasMany(models.ApplicationQuestions, {
                foreignKey: 'applicationId',
                as: 'ApplicationQuestions',
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }

    Applications.init(
        {
            applicationId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            driveId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            documentUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            statusId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            appliedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            }
        },
        {
            sequelize,
            modelName: 'Applications',
            tableName: 'Applications',
            freezeTableName: true,
            timestamps: false,
            underscored: true,

        }
    );

    return Applications;
};
