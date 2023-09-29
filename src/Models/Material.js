import { DataTypes} from "sequelize";

export const material = (sequelize) =>{
    sequelize.define("Material", {
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        origen:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        image:{
            type: DataTypes.STRING,
            allowNull:true
        }

    })
}