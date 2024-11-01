const { sequelize } = require('./db');
const { Band, Musician, Song, Manager } = require('./index')
const { db } = require('./db.js')


describe('Band, Musician, and Song Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await db.sync({ force: true });
    })

    test('can create a Band', async () => {
        const band = await Band.create({
            name: 'Test Band 1',
            genre: 'Test Genre',
        });
        expect(band.name).toBe('Test Band 1');
        expect(band.genre).toBe('Test Genre');
    })

    test('can create a Musician', async () => {
        const musician = await Musician.create({
            name: 'Test Musician 1',
            instrument: 'Test Instrument',
        })
        expect(musician.name).toBe('Test Musician 1');
    })

    test('can update a Band', async () => {
        const band = await Band.create({
            name: 'Update Band',
            genre: 'Update Genre',
        });
        await band.update({
            name: 'Updated Band',
            genre: 'Updated Genre',
        });

        expect(band.name).toBe('Updated Band');
        expect(band.genre).toBe('Updated Genre');
    })

    test('can update a Musician', async () => {
        const musician = await Musician.create({
            name: 'Update Musician',
            instrument: 'Update Instrument',
        })

        await musician.update({
            name: 'Updated Musician',
            instrument: 'Updated Instrument',
        });

        expect(musician.name).toBe('Updated Musician');
        expect(musician.instrument).toBe('Updated Instrument');
    })

    test('can delete a Band', async () => {
        const band = await Band.create({
            name: 'Delete Band',
            genre: 'Delete Genre',
        });

        await band.destroy();
        const foundBand = await Band.findByPk(band.id)

        expect(foundBand).toBe(null);
    })

    test('can delete a Musician', async () => {
        const musician = await Band.create({
            name: 'Delete Musician',
            genre: 'Delete Instrument',
        });
        
        await musician.destroy();
        const foundMusician = await Band.findByPk(musician.id)

        expect(foundMusician).toBe(null);
    })

    test("Band-Musician associations" , async () => {
        const band = await Band.create({
            name: 'Band with Musicians',
            genre: 'Rock',
        })

        const musician1 = await Musician.create({
            name: 'Musician 1',
            instrument: 'Guitar',
        })
        const musician2 = await Musician.create({
            name: 'Musician 2',
            instrument: 'Drums',
        })

        await band.addMusician(musician1)
        await band.addMusician(musician2)

        const bandMusicians = await band.getMusicians()
        // console.log(JSON.stringify(bandMusicians, null, 2))

        expect(bandMusicians.length).toEqual(2)
    })

    test("Musician-Song associations" , async () => {
        const song1 = await Song.create({
            title: 'Song 1',
            year: 2020,
            length: 3.5,
        })
        const song2 = await Song.create({
            title: 'Song 2',
            year: 2021,
            length: 4.0,
        })

        const musician1 = await Musician.create({
            name: 'Musician 1',
            instrument: 'Guitar',
        })
        const musician2 = await Musician.create({
            name: 'Musician 2',
            instrument: 'Drums',
        })

        await musician1.addSongs(song1)
        await musician1.addSongs(song2)
        const musicianSongs = await musician1.getSongs()
        expect(musicianSongs.length).toBe(2)
        
        await song1.addMusicians(musician1)
        await song1.addMusicians(musician2)
        const songMusicians = await song1.getMusicians()
        expect(songMusicians.length).toBe(2)

        //const musicianSongs = await musician1.getSongs()
        console.log(JSON.stringify(musicianSongs))
    })

    test("Manager-Band associations", async () => {
        const band = await Band.create({
            name: 'Test Band',
            genre: 'Rock',
        });

        const manager = await Manager.create({
            name: 'Test Manager',
            email: 'manager@test.com',
            salary: 50000,
            dateHired: new Date(),
        });

        await band.setManager(manager);

        const foundBand = await Band.findByPk(band.id, {
            include: Manager // Include the associated manager
        });

        // console.log(JSON.stringify(foundBand, null, 2))

        expect(foundBand.Manager).toBeDefined();
        expect(foundBand.Manager.name).toBe('Test Manager');
    })
})