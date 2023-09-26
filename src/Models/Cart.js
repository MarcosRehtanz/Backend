import {DataTypes} from "sequelize";

export const Cart = (sequelize)=>{

    sequelize.define("Cart", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {timetamps: false})
}