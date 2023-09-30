import { DataTypes } from "sequelize";

export const profile = (sequelize) => {
  sequelize.define("Profile", {
    idProfile: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cuitCuil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    typeUser: {
      type: DataTypes.ENUM("Comprador", "Vendedor", "Transportista"),
      allowNull: true,
    },
    afipCondition: {
      type: DataTypes.ENUM("Juridica", "Fisica"),
      allowNull: true,
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
