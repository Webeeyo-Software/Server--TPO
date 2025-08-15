import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface TPORegistrationAttributes {
  id: string;
  user_id: string;
  verified_by?: string;
  verified_at?: Date;
  status?: 'Pending' | 'Verified' | 'Rejected';
  is_deleted?: boolean;
}

type TPORegistrationCreationAttributes = Optional<TPORegistrationAttributes, 'id' | 'verified_by' | 'verified_at' | 'status' | 'is_deleted'>;

export class TPORegistration extends Model<TPORegistrationAttributes, TPORegistrationCreationAttributes> implements TPORegistrationAttributes {
  public id!: string;
  public user_id!: string;
  public verified_by?: string;
  public verified_at?: Date;
  public status?: 'Pending' | 'Verified' | 'Rejected';
  public is_deleted?: boolean;

  static associate(models: any) {
    TPORegistration.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
    TPORegistration.belongsTo(models.Users, { foreignKey: 'verified_by', as: 'verifier' });
  }
}

export const TPORegistrationFactory = (sequelize: Sequelize) => {
  TPORegistration.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      user_id: { type: DataTypes.UUID, allowNull: false },
      verified_by: { type: DataTypes.UUID, allowNull: true },
      verified_at: { type: DataTypes.DATE, allowNull: true },
      status: { type: DataTypes.ENUM('Pending', 'Verified', 'Rejected'), defaultValue: 'Pending' },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { tableName: 'TPORegistrations', sequelize, timestamps: false }
  );
  return TPORegistration;
};
