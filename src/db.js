import { Sequelize } from "sequelize";
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

const sequelize = new Sequelize(process.env.POSTGRES, { logging: false });

//Define
user(sequelize);
product(sequelize);
shoppingHistory(sequelize);
typePerson(sequelize);
typeUser(sequelize);
materials(sequelize);
profile(sequelize);
review(sequelize);
subMaterials(sequelize);

//Models
const { User, Profile, Product, ShoppingHistory, TypePerson, TypeUser, Materials, Review, SubMaterials } = sequelize.models;

// Relations
User.hasOne(Profile);
Profile.belongsTo(User);

User.hasMany(Product);
Product.belongsTo(User);

User.hasMany(ShoppingHistory);
ShoppingHistory.belongsTo(User);

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
