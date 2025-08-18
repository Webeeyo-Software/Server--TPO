import { Sequelize,DataTypes, Optional,Model } from "sequelize";
interface PlacementDrivesAttributes  {
    drive_id: number,
    company_id: number,
    position: string,
    drive_date: Date,
    posted_by: number,
    location: string,
    eligibility_criteria: Text,
    job_desription: Text,
    ctc: number,
    drive_type_id: number,
    application_deadline: Date,
    is_deleted?: boolean | 'false',
    created_at?: Date,
};

interface PlacementDrivesCreationAttributes extends Optional<PlacementDrivesAttributes, 'drive_id'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class PlacementDrives extends Model<PlacementDrivesAttributes, PlacementDrivesCreationAttributes> implements PlacementDrivesAttributes {
        public drive_id!: number;
        public company_id!: number;
        public position!: string;
        public drive_date!: Date;
        public posted_by!: number;
        public location!: string;
        public eligibility_criteria!: Text;
        public job_desription!: Text;
        public ctc!: number;
        public drive_type_id!: number;
        public application_deadline!: Date;
        public is_deleted!: boolean | 'false';
        
        public readonly created_at?: Date;

        static associate(models: any) {
           PlacementDrives.hasMany(models.Application, {
               foreignKey: 'drive_id',
               as: 'applications',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           })
           PlacementDrives.belongsTo(models.DriveTypes, {
               foreignKey: 'drive_type_id',
               as: 'drive_type',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           });
           PlacementDrives.belongsTo(models.Companies, {
               foreignKey: 'company_id',
               as: 'company',
               onDelete: "CASCADE",
               onUpdate: "CASCADE",

           });
        }
    }

    PlacementDrives.init(
        {
            drive_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            company_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            drive_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            posted_by: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            eligibility_criteria: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            job_desription: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            ctc: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            drive_type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            application_deadline: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: 'false',
            },
        },
        {
            sequelize,
            modelName: 'PlacementDrives',
            tableName: 'PlacementDrives',
        }
    );

    return PlacementDrives;
};