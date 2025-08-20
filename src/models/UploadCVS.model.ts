import {Model,DataTypes,Sequelize,Optional} from 'sequelize';
interface UploadCVSAttributes {
    id:string;
    registrationNo:bigint;
    cvName:string;
    cvType:string;
    filePath:string;
    isDefault?:boolean;
    isUploaded?:boolean;
    isDeleted?:boolean;
}
interface UploadCVSCreationAttributes extends Optional<UploadCVSAttributes, 'id'> {}
module.exports = (sequelize:Sequelize,DataTypes:any) => {
    class UploadCVS extends Model<UploadCVSAttributes, UploadCVSCreationAttributes> implements UploadCVSAttributes {
        public id!: string;
        public registrationNo!: bigint;
        public cvName!: string;
        public cvType!: string;
        public filePath!: string;
        public isDefault?: boolean;
        public isUploaded?: boolean;
        public isDeleted?: boolean;

        static associate(models: any) {
            UploadCVS.belongsTo(models.StudentProfiles, {
                foreignKey: 'registrationNo',
                as: 'studentProfile',
                
            });
        }
    }
    UploadCVS.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            registrationNo: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            cvName: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            cvType: {
                type: DataTypes.STRING(50),
                allowNull: false,
            },
            filePath: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            isDefault: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isUploaded: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: 'UploadCVS',
            tableName: 'UploadCVS',
            timestamps: true,
            
            freezeTableName: true,
        }
    );
    return UploadCVS;
}