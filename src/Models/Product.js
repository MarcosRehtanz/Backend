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
            allowNull: false
        },
        description:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        stock:{
            type: DataTypes.INTEGER
        },
        publicationDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        productImage: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },{timetamps: false})
}