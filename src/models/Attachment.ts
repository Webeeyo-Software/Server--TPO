import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
import { sequelize } from '.';
interface AttachmentAttributes {
    attachmentId:number,
    driveId:number,
    fileUrl:Text,
    type:'PDF'|'DOCX'|'IMAGE',
    uploadedAt?:Date,
    isDeleted?:boolean,
};
interface AttachmentCreationAttributes extends Optional<AttachmentAttributes,'attachmentId'>{}
module.exports=(sequelize:Sequelize,DataTypes:any)=>{
    class Attachments extends Model<AttachmentAttributes,AttachmentCreationAttributes> implements AttachmentAttributes{
        public attachmentId!:number;
        public driveId!:number;
        public fileUrl!:Text;
        public type!: 'PDF' | 'DOCX' | 'IMAGE';
        public uploadedAt?:Date;
        public isDeleted?:boolean;

        static associate(models:any){
            Attachments.belongsTo(models.PlacementDrives, {
                foreignKey: 'driveId',
                as: 'placementDrives',
                onDelete: "CASCADE",
               onUpdate: "CASCADE",
            });
        }
    }
    Attachments.init(
        {
            attachmentId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            driveId: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            fileUrl: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('PDF', 'DOCX', 'IMAGE'),
                allowNull: false,
            },
            uploadedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            sequelize,
            modelName: 'Attachments',
            tableName: 'Attachments',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );
    return Attachments;
}
