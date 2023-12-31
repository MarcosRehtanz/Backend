import { DataTypes, STRING } from "sequelize";

export const user = (sequelize) => {
  sequelize.define(
    "User",
    {
      idUser: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      acountActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      role:{
        type:DataTypes.ENUM('admin','user'),
        defualtValue: "user",
        allowNull: true,
      },
      termsAndCondsAprove: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    { 
      timetamps: false,
      paranoid: true 
     }
  );
};
