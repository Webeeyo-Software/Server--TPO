import { Model, DataTypes, Optional, Sequelize } from 'sequelize';
interface DriveTypeAttributes {
    drive_type_id:number;
    drive_type_name:string;

}
interface DriveCreationAttributes extends Optional<DriveTypeAttributes,'drive_type_id'>{}
module.exports=(sequelize:Sequelize, DataTypes:any)=>{
    class DriveTypes extends Model<DriveTypeAttributes, DriveCreationAttributes> implements DriveTypeAttributes {
       public drive_type_id!: number;
       public drive_type_name!: string;
       public readonly createdAt!: Date;
       public readonly updatedAt!: Date;

        
       static associate(models:any) {
        DriveTypes.hasMany(models.PlacementDrives, {
            foreignKey: 'drive_type_id',
            as: 'placement_drives',
            onDelete: "CASCADE",
            onUpdate: "CASCADE",

        });

       }      
        }
     DriveTypes.init(
        {
            drive_type_id:{
                type:DataTypes.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            drive_type_name:{
                type:DataTypes.STRING,
                allowNull:false,
                unique:true,
            }
        },
        {
            sequelize,
            modelName:'DriveTypes',
            tableName:'DriveTypes',
        }
     );
     return DriveTypes;
    }