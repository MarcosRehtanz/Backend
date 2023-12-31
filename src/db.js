import pg from 'pg';
import { DataTypes, Sequelize } from "sequelize";
import "dotenv/config";

import { user } from "./Models/User.js";
import { product } from "./Models/Product.js";
import { shoppingHistory } from "./Models/ShoppingHistory.js";
import { typePerson } from "./Models/TypePerson.js";
import { typeUser } from "./Models/TypeUser.js";
import { materials } from "./Models/Materials.js";
import { subMaterials } from "./Models/SubMaterials.js";
import { profile } from "./Models/Profile.js";
import { review } from "./Models/Review.js";
import { buyOrders } from "./Models/BuyOrders.js";
import { blog } from './Models/Blog.js';

const sequelize = new Sequelize(process.env.POSTGRES_URL, { dialectModule: pg, logging: false });

//Define
user(sequelize);
product(sequelize);
shoppingHistory(sequelize);
buyOrders(sequelize)
typePerson(sequelize);
typeUser(sequelize);
materials(sequelize);
profile(sequelize);
review(sequelize);
subMaterials(sequelize);
blog(sequelize)

//Models
const { User, Profile, Product, ShoppingHistory, BuyOrders, TypePerson, TypeUser, Materials, Review, SubMaterials, Blog } = sequelize.models;

// Relations
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(ShoppingHistory);
ShoppingHistory.belongsTo(User);

ShoppingHistory.hasMany(BuyOrders);
BuyOrders.belongsTo(ShoppingHistory);

BuyOrders.hasMany(Product, { foreignKey: { type: DataTypes.UUID } });
Product.belongsTo(BuyOrders);

// relacion de uno a muchos, materiales y submateriales, respectivamente
Materials.hasMany(SubMaterials);
SubMaterials.belongsTo(Materials);

// relacion muchos a muchos materiales y productos
Materials.belongsToMany(Product, { through: 'Product_Materials' }); 
Product.belongsToMany(Materials, { through: 'Product_Materials' });

// relacion muchos a muchos submateriales y productos
SubMaterials.belongsToMany(Product, { through: 'Product_SubMaterials' });
Product.belongsToMany(SubMaterials, { through: 'Product_SubMaterials' });

Product.hasMany(Review);
Review.belongsTo(Product);

User.hasMany(Review);
Review.belongsTo(User);

export const conn = sequelize;
export const models = sequelize.models;
