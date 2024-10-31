const {DataTypes, db, Model} = require('../db');

// TODO - define the Manager model
class Manager extends Model {
    static {
        Manager.init({
            name: DataTypes.STRING, 
            email: DataTypes.STRING,
            salary: DataTypes.FLOAT,
            dateHired: DataTypes.DATE,
        },{
            sequelize: db
        })
    }
}

module.exports = {
    Manager
};