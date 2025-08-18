import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
interface OfferLetterAttributes {
    offerLetterId: number;
    applicationId: number;
    fileUrl: Text;
    type: 'PDF' | 'DOCX' | 'IMAGE';
    issuedAt?: Date;
    isDeleted?: boolean;
}
interface OfferLetterCreationAttributes extends Optional<OfferLetterAttributes, 'offerLetterId'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class OfferLetters extends Model<OfferLetterAttributes, OfferLetterCreationAttributes> implements OfferLetterAttributes {
        public offerLetterId!: number;
        public applicationId!: number;
        public fileUrl!: Text;
        public type!: 'PDF' | 'DOCX' | 'IMAGE';
        public issuedAt?: Date;
        public isDeleted?: boolean;

        static associate(models: any) {
            OfferLetters.belongsTo(models.Application, {
                foreignKey: 'applicationId',
                as: 'applications',
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    OfferLetters.init(
        {
          offerLetterId:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,             
        },
        applicationId:{
            type:DataTypes.UUID,
            allowNull:false
        },
        fileUrl:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        type:{
            type:DataTypes.ENUM('PDF', 'DOCX', 'IMAGE'),
            allowNull:false
        },
        issuedAt:{
            type:DataTypes.DATE,
            allowNull:true
        },
        isDeleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize,
        tableName: 'offerLetters',
        modelName: 'OfferLetters',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        }
    );
    return OfferLetters;
};
