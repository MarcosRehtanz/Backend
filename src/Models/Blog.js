import { DataTypes } from 'sequelize';

export const blog = (sequelize) => {

    sequelize.define('Blog', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        timetamps: false,
        paranoid: true
    }
    )
}