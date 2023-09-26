import {DataTypes} from "sequelize";

export const Cart = (sequelize)=>{

    sequelize.define("Cart", {
        idCart: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {timetamps: false})
}