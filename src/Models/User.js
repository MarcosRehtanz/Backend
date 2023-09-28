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
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname:{
        type:DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cuitCuil: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
      },
      typeUser: {
        type: DataTypes.ENUM("comprador", "vendedor", "transportista"),
        allowNull: false
      },
      afipCondition: {
        type: DataTypes.ENUM("Juridica", "Fisica"),
        allowNull: false
      },
    },
    { timetamps: false }
  );
};
