const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { db } = require('./db.js')
// Define associations here

Band.hasMany(Musician)
Musician.belongsTo(Band) 

module.exports = {
    Band,
    Musician,
    Song
};
