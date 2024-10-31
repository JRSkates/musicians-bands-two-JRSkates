const { sequelize } = require('./db');
const { Band, Musician, Song } = require('./index')
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
})