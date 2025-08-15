// models/Document.ts
export default (sequelize: any, DataTypes: any) => {
    const Document = sequelize.define("Document", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        file_url: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        uploaded_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'Documents',
        timestamps: false
    });

    Document.associate = (models: any) => {
        Document.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        models.User.hasMany(Document, { foreignKey: 'user_id', as: 'documents' });

        Document.belongsTo(models.DocumentType, { foreignKey: 'type_id', as: 'documentType' });
        models.DocumentType.hasMany(Document, { foreignKey: 'type_id', as: 'documents' });
    };

    return Document;
};
