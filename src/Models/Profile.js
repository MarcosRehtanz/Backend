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
      type: DataTypes.ENUM("comprador", "vendedor", "transportista"),
      allowNull: true,
    },
    afipCondition: {
      type: DataTypes.ENUM("Juridica", "Fisica"),
      allowNull: true,
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isBan: {
      type: DataTypes.BOOLEAN,
      defualtValue:false,
     },
  }, {
    timetamps: false,
    paranoid: true
  });
};
