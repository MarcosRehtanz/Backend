import { DataTypes} from "sequelize";

export const materials = (sequelize) =>{
    sequelize.define("Materials", {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        description:{
            type: DataTypes.TEXT,
            allowNull: true,
        },
        image:{
            type: DataTypes.TEXT,
            allowNull: true
        },

    },{
        timetamps: false,
        paranoid: true
    });
};