import sequelize from "../config/database.js";
import EmailMetadata from "./emailMetadata.js";
import User from "./user.js";

// Initialize associations (if needed)
User.hasMany(EmailMetadata, { foreignKey: "userId" });
EmailMetadata.belongsTo(User, { foreignKey: "userId" });

const db = { sequelize, User, EmailMetadata };

export default db;
