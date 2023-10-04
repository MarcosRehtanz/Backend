import { DataTypes } from "sequelize";

export const review = (sequelize) => {
    sequelize.define("Review", {
        idReview: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                max: 5,
                min: 1
            }
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                max: 250
            }
        },
    }, {
        paranoid: true,
        updatedAt: false,
    })
}