import { DataType } from "sequelize";

export const profile = (sequelize) => {
  sequelize.define("Profile", {
    idProfile: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    typeUser: {
      type: DataTypes.ENUM("comprador", "vendedor", "transportista"),
      allowNull: false,
    },
    afipCondition: {
      type: DataTypes.ENUM("Juridica", "Fisica"),
      allowNull: false,
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
  });
};
