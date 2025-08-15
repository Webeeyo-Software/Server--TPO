// // models/NoticeAttachments.ts
// import { DataTypes, Model, Optional, Sequelize } from 'sequelize';

// interface NoticeAttachmentAttributes {
//   id: number;
//   noticeId: number; // foreign key to Notices table
//   fileName: string;
//   filePath: string;
//   fileType?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// type NoticeAttachmentCreationAttributes = Optional<NoticeAttachmentAttributes, 'id'>;

// export class NoticeAttachment
//   extends Model<NoticeAttachmentAttributes, NoticeAttachmentCreationAttributes>
//   implements NoticeAttachmentAttributes
// {
//   public id!: number;
//   public noticeId!: number;
//   public fileName!: string;
//   public filePath!: string;
//   public fileType?: string;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// export function NoticeAttachmentFactory(sequelize: Sequelize) {
//   NoticeAttachment.init(
//     {
//       id: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         autoIncrement: true,
//         primaryKey: true,
//       },
//       noticeId: {
//         type: DataTypes.INTEGER.UNSIGNED,
//         allowNull: false,
//         references: {
//           model: 'Notices',
//           key: 'id',
//         },
//         onDelete: 'CASCADE',
//       },
//       fileName: {
//         type: DataTypes.STRING(255),
//         allowNull: false,
//       },
//       filePath: {
//         type: DataTypes.STRING(500),
//         allowNull: false,
//       },
//       fileType: {
//         type: DataTypes.STRING(50),
//         allowNull: true,
//       },
//     },
//     {
//       sequelize,
//       tableName: 'NoticeAttachments',
//       timestamps: true,
//     }
//   );

//   return NoticeAttachment;
// }
  import { Model, DataTypes, Optional, Sequelize } from 'sequelize';

interface NoticeAttachmentAttributes {
  id: string;
  notice_id: string;
  file_url: string;
  uploaded_at?: Date;
  is_deleted?: boolean;
}

type NoticeAttachmentCreationAttributes = Optional<NoticeAttachmentAttributes, 'id' | 'uploaded_at' | 'is_deleted'>;

export class NoticeAttachment extends Model<NoticeAttachmentAttributes, NoticeAttachmentCreationAttributes> implements NoticeAttachmentAttributes {
  public id!: string;
  public notice_id!: string;
  public file_url!: string;
  public uploaded_at?: Date;
  public is_deleted?: boolean;

  static associate(models: any) {
    NoticeAttachment.belongsTo(models.Notice, { foreignKey: 'notice_id', as: 'notice' });
  }
}

export const NoticeAttachmentFactory = (sequelize: Sequelize) => {
  NoticeAttachment.init(
    {
      id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
      notice_id: { type: DataTypes.UUID, allowNull: false },
      file_url: { type: DataTypes.TEXT, allowNull: false },
      uploaded_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    { tableName: 'NoticeAttachments', sequelize, timestamps: false }
  );
  return NoticeAttachment;
};
