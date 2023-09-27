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
      userName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName:{
        type:DataTypes.STRING,
        allowNull: false
      },
      nickName: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      newPassword: {
        type: DataTypes.STRING,
      },
      cuitCuil: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
      },
      postalCode: {
        type: DataTypes.INTEGER,
      },
      acountActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      termsAndCondsAprove: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deleteAd: {
        type: DataTypes.DATEONLY,
      },
      profilePicture: {
        type: DataTypes.TEXT,
      },
      description: {
        type: DataTypes.STRING(5000),
      },
      typeUser: {
        type: DataTypes.ENUM("buyer", "seller", "both", "delivery"),
        allowNull: true
      },
    },
    { timetamps: false }
  );
};
