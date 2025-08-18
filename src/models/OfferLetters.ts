import {Sequelize,Optional,Model,DataTypes} from 'sequelize';
interface OfferLetterAttributes {
    offer_letter_id: number;
    application_id: number;
    file_url: Text;
    type: 'PDF' | 'DOCX' | 'IMAGE';
    issued_at?: Date;
    is_deleted?: boolean;
}
interface OfferLetterCreationAttributes extends Optional<OfferLetterAttributes, 'offer_letter_id'> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
    class OfferLetter extends Model<OfferLetterAttributes, OfferLetterCreationAttributes> implements OfferLetterAttributes {
        public offer_letter_id!: number;
        public application_id!: number;
        public file_url!: Text;
        public type!: 'PDF' | 'DOCX' | 'IMAGE';
        public issued_at?: Date;
        public is_deleted?: boolean;

        static associate(models: any) {
            OfferLetter.belongsTo(models.Application, {
                foreignKey: 'application_id',
                as: 'application',
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    OfferLetter.init(
        {
          offer_letter_id:{
            type:DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,             
        },
        application_id:{
            type:DataTypes.UUID,
            allowNull:false
        },
        file_url:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        type:{
            type:DataTypes.ENUM('PDF', 'DOCX', 'IMAGE'),
            allowNull:false
        },
        issued_at:{
            type:DataTypes.DATE,
            allowNull:true
        },
        is_deleted:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        sequelize,
        tableName: 'offer_letters',
        modelName: 'OfferLetter',
        freezeTableName: true,
        timestamps: false,
        underscored: true,
        }
    );
    return OfferLetter;
};
