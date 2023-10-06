import { DataTypes } from "sequelize";

export const subMaterials = (sequelize) => {
    sequelize.define("SubMaterials", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        deletedAt: {
            type: DataTypes.DATEONLY
          }
    }, {
        timetamps: false,
        paranoid: true
    })
}