import { DataTypes } from "sequelize";

export const user = (sequelize) => {

    sequelize.define('User', {
        idUser: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
        },
        postalCode: {
            type: DataTypes.INTEGER
        },
        nickName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },{timetamps: false})
}