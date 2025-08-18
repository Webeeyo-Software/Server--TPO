import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
import { sequelize } from '.';
interface AttachmentAttributes {
    attachment_id:number,
    drive_id:number,
    file_url:Text,
    type:'PDF'|'DOCX'|'IMAGE',
    uploaded_at?:Date,
    is_deleted?:boolean,
};
interface AttachmentCreationAttributes extends Optional<AttachmentAttributes,'attachment_id'>{}
module.exports=(sequelize:Sequelize,DataTypes:any)=>{
    class Attachment extends Model<AttachmentAttributes,AttachmentCreationAttributes> implements AttachmentAttributes{
        public attachment_id!:number;
        public drive_id!:number;
        public file_url!:Text;
        public type!: 'PDF' | 'DOCX' | 'IMAGE';
        public uploaded_at?:Date;
        public is_deleted?:boolean;

        static associate(models:any){
            Attachment.belongsTo(models.PlacementDrives, {
                foreignKey: 'drive_id',
                as: 'placementDrive',
                onDelete: "CASCADE",
               onUpdate: "CASCADE",
            });
        }
    }
    Attachment.init(
        {
            attachment_id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            drive_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            file_url: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            type: {
                type: DataTypes.ENUM('PDF', 'DOCX', 'IMAGE'),
                allowNull: false,
            },
            uploaded_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            }
        },
        {
            sequelize,
            modelName: 'Attachment',
            tableName: 'Attachments',
            freezeTableName: true,
            timestamps: false,
            underscored: true,
        }
    );
    return Attachment;
}
