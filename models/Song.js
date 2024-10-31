const {Model, db, DataTypes} = require('../db');

// TODO - define the Song model
class Song extends Model {
    static{
        Song.init({
            title: DataTypes.STRING, 
            year: DataTypes.NUMBER,
            length: DataTypes.NUMBER
        }, {
            sequelize: db,
        })
    }
}
