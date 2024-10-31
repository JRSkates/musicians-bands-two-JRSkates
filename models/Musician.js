const {Model, db, DataTypes} = require('../db');

// TODO - define the Musician model
class Musician extends Model {
    static {
        Musician.init({
            name: DataTypes.STRING, 
            instrument: DataTypes.STRING,
        }, {
            sequelize: db,
        })
    }
}

module.exports = {
    Musician
};