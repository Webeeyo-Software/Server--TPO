import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NationalityAttributes {
  nationality_id: string;
  nationality_name: string;
}

type NationalityCreationAttributes = Optional<NationalityAttributes, 'nationality_id'>;

export class Nationality extends Model<NationalityAttributes, NationalityCreationAttributes>
  implements NationalityAttributes {
  public nationality_id!: string;
  public nationality_name!: string;

  static associate(models: any) {
    Nationality.hasMany(models.StudentProfile, {
      foreignKey: 'nationality_id',
      as: 'students',
    });
  }
}

export const NationalityFactory = (sequelize: Sequelize) => {
  Nationality.init(
    {
      nationality_id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      nationality_name: { type: DataTypes.STRING(50), allowNull: false, unique: true },
    },
    { tableName: 'Nationalities', sequelize, timestamps: false }
  );
  return Nationality;
};
