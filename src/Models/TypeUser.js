import { DataTypes } from "sequelize";

export const typeUser = (sequelize) => {
    sequelize.define('TypeUser', {
        idPerson: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        typeUser: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timetamps: false })
}