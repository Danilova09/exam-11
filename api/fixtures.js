const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [Amanda, Violette, Chris] = await User.create({
        name: 'Amanda',
        email: 'amanda@gmail.com',
        password: '1',
        token: '1',
    }, {
        name: 'Violette',
        email: 'vi@gmail.com',
        password: '2',
        token: '2',
    }, {
        name: 'Chris',
        email: 'chris@gmail.com',
        password: '3',
        token: '3',
    });

    await mongoose.connection.close();
};

run().catch(e => console.error(e));