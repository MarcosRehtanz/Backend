import { Sequelize } from "sequelize";
import "dotenv/config";

import { user } from "./Models/User.js";
import { product } from "./Models/Product.js";
import { shoppingHistory } from "./Models/ShoppingHistory.js";
import { typePerson } from "./Models/TypePerson.js";
import { typeUser } from "./Models/TypeUser.js";
import { material } from "./Models/Material.js";
import { profile } from "./Models/Profile.js";
const sequelize = new Sequelize(process.env.POSTGRES, { logging: false });

//Define
user(sequelize);
product(sequelize);
shoppingHistory(sequelize);
typePerson(sequelize);
typeUser(sequelize);
material(sequelize);
profile(sequelize)
//Models
const { User, Profile, Product, ShoppingHistory, TypePerson, TypeUser, Material } = sequelize.models;

// Relations
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(ShoppingHistory, {
  foreignKey: "userID",
});
ShoppingHistory.belongsTo(User);

Material.hasMany(Product); // Un material puede pertenecer a muchos
Product.belongsTo(Material); //Un producto puede tener un material

export const conn = sequelize;
export const models = sequelize.models;
