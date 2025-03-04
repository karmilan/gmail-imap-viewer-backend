import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; // Adjust the path as necessary

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    oauth_token: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    timestamps: true,
    tableName: 'user',
});

export default User;
