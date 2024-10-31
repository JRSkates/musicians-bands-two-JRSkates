const { Band } = require('./models/Band')
const { Musician } = require('./models/Musician')
const { Song } = require("./models/Song")
const { db } = require('./db.js')
// Define associations here

Band.hasMany(Musician)
Musician.belongsTo(Band) 

Musician.belongsToMany(Song, { through: "MusicianSongs" })
Song.belongsToMany(Musician, { through: "MusicianSongs" })

module.exports = {
    Band,
    Musician,
    Song
};
