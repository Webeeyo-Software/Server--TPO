import { Sequelize,DataTypes, Optional,Model } from "sequelize";
interface PlacementDrivesAttributes  {
    driveId: number,
    companyId: number,
    position: string,
    driveDate: Date,
    postedBy: number,
    location: string,
    eligibilityCriteria: Text,
    jobDescription: Text,
    ctc: number,
    driveTypeId: number,
    applicationDeadline: Date,
    isDeleted?: boolean | 'false',
    createdAt?: Date,
};

interface PlacementDrivesCreationAttributes extends Optional<PlacementDrivesAttributes, 'driveId'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class PlacementDrives extends Model<PlacementDrivesAttributes, PlacementDrivesCreationAttributes> implements PlacementDrivesAttributes {
        public driveId!: number;
        public companyId!: number;
        public position!: string;
        public driveDate!: Date;
        public postedBy!: number;
        public location!: string;
        public eligibilityCriteria!: Text;
        public jobDescription!: Text;
        public ctc!: number;
        public driveTypeId!: number;
        public applicationDeadline!: Date;
        public isDeleted!: boolean | 'false';

        public readonly createdAt?: Date;

        static associate(models: any) {
           PlacementDrives.hasMany(models.Application, {
               foreignKey: 'driveId',
               as: 'applications',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           })
           PlacementDrives.belongsTo(models.DriveTypes, {
               foreignKey: 'driveTypeId',
               as: 'driveType',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           });
           PlacementDrives.belongsTo(models.Companies, {
               foreignKey: 'companyId',
               as: 'company',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           });
        }
    }

    PlacementDrives.init(
        {
            driveId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            companyId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            driveDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            postedBy: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            eligibilityCriteria: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            jobDescription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            ctc: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            driveTypeId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            applicationDeadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: 'false',
            },
        },
        {
            sequelize,
            modelName: 'PlacementDrives',
            tableName: 'PlacementDrives',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );

    return PlacementDrives;
};