import { DataTypes } from "sequelize";

export const product = (sequelize)=>{
    sequelize.define('Product',{
        idProduct: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        description:{
            type: DataTypes.STRING,
            allowNull: true
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        stock:{
            type: DataTypes.INTEGER,
            allowNull: true
        },
        publicationDate:{
            type: DataTypes.STRING,
            allowNull: false
        },
        productImage: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{timetamps: false})
}