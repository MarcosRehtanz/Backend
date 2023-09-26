import { DataTypes } from "sequelize";

export const User = (sequelize) => {
    sequelize.define('User', {
        idPerson: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        type_person: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timetamps: false })
}