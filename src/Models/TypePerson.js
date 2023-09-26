import { DataTypes } from "sequelize";

export const typePerson = (sequelize) => {
    sequelize.define('TypePerson', {
        idPerson: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        typePerson: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, { timetamps: false })
}