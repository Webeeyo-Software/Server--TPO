import { Sequelize, Optional, Model, DataTypes } from "sequelize";
interface OfferLetterAttributes {
  id: string;
  applicationId: string;
  fileUrl: Text;
  type: "PDF" | "DOCX" | "IMAGE";
  issuedAt?: Date;
  isDeleted?: boolean;
}
interface OfferLetterCreationAttributes
  extends Optional<OfferLetterAttributes, "id"> {}
module.exports = (sequelize: Sequelize, DataTypes: any) => {
  class OfferLetters
    extends Model<OfferLetterAttributes, OfferLetterCreationAttributes>
    implements OfferLetterAttributes
  {
    public id!: string;
    public applicationId!: string;
    public fileUrl!: Text;
    public type!: "PDF" | "DOCX" | "IMAGE";
    public issuedAt?: Date;
    public isDeleted?: boolean;

    static associate(models: any) {
      OfferLetters.belongsTo(models.Applications, {
        foreignKey: "applicationId",
        as: "applications",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  OfferLetters.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      applicationId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      fileUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM("PDF", "DOCX", "IMAGE"),
        allowNull: false,
      },
      issuedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "OfferLetters",
      modelName: "OfferLetters",
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    }
  );
  return OfferLetters;
};
