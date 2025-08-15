import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NationalityAttributes {
  nationality_id: string;
  nationality_name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface NationalityCreationAttributes extends Optional<NationalityAttributes, 'nationality_id'> {}

module.exports = (sequelize: Sequelize) => {
  class Nationality extends Model<NationalityAttributes, NationalityCreationAttributes>
    implements NationalityAttributes {
    public nationality_id!: string;
    public nationality_name!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
  }

  Nationality.init(
    {
      nationality_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      nationality_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: 'Nationality',
      tableName: 'Nationalities',
    }
  );

  return Nationality;
};
