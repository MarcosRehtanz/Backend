import { DataTypes } from "sequelize";

export const buyOrders = (sequelize) => {

    sequelize.define('BuyOrders', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING
        },
        unit_price: {
            type: DataTypes.FLOAT,
            allowNull:false,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    },{
        timetamps: false,
        paranoid: true
    })

}