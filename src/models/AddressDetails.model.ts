import {Model,DataTypes,Sequelize,Optional} from 'sequelize';
interface AddressDetailsAttributes{
    id:string;
    registrationNo:bigint;
    localAddress: string;
  permanentAddress: string;
  pincode: string;
  state: string;
  district: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
}
export interface AddressDetailsCreationAttributes extends Optional<AddressDetailsAttributes,"id">{}
 module.exports=(sequelize:Sequelize,DataTypes:any)=>{
    class AddressDetails extends Model<AddressDetailsAttributes,AddressDetailsCreationAttributes>{
       public id!: string;
       public registrationNo!: bigint;
       public localAddress!: string;
       public permanentAddress!: string;
       public pincode!: string;
       public state!: string;
       public district!: string;
       public country!: string;
       public createdAt?: Date;
       public updatedAt?: Date;
       public isDeleted?: boolean;

       static associate(models: any) {
         AddressDetails.belongsTo(models.StudentProfiles, {
           foreignKey: "registrationNo",
           as: "studentProfiles",
           onUpdate: "CASCADE",
           onDelete: "CASCADE",
         });
       }
    }
    AddressDetails.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            registrationNo: {
                type: DataTypes.BIGINT,
                allowNull: false,
                unique: true,
            },
            localAddress: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            permanentAddress: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            pincode: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            district: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
        },
        {
            sequelize,
            modelName: "AddressDetails",
            tableName: "AddressDetails",
            timestamps: false,
        }
    );
    return AddressDetails;

 }

       