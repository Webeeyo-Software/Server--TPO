import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
interface DriveTypeAttributes {
    driveTypeId:number;
    driveTypeName:string;

}
interface DriveCreationAttributes extends Optional<DriveTypeAttributes,'driveTypeId'>{}
module.exports=(sequelize:Sequelize, DataTypes:any)=>{
    class DriveTypes extends Model<DriveTypeAttributes, DriveCreationAttributes> implements DriveTypeAttributes {
       public driveTypeId!: number;
       public driveTypeName!: string;
       public readonly createdAt!: Date;
       public readonly updatedAt!: Date;

        
       static associate(models:any) {
        DriveTypes.hasMany(models.PlacementDrives, {
            foreignKey: 'driveTypeId',
            as: 'placementDrives',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        });

       }      
        }
     DriveTypes.init(
        {
            driveTypeId:{
                type:DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey:true,
            },
            driveTypeName:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:true,
            }
        },
        {
            sequelize,
            modelName:'DriveTypes',
            tableName:'DriveTypes',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
     );
     return DriveTypes;
    }