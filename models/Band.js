const {DataTypes, db, Model} = require('../db');

// TODO - define the Band model
class Band extends Model {
    static {
        Band.init({
            name: DataTypes.STRING, 
            genre: DataTypes.STRING,
        },{
            sequelize: db
        })
    }
}

module.exports = {
    Band
};