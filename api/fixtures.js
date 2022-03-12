const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const Category = require("./models/Category");
const Item = require("./models/Item");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [Amanda, Violette, Chris] = await User.create({
        email: 'amanda@gmail.com',
        password: '1',
        displayName: 'Amanda',
        phoneNumber: '0550 505-501',
        token: '1',
    }, {
        email: 'john@gmail.com',
        password: '2',
        displayName: 'John',
        phoneNumber: '0550 505-502',
        token: '2',
    }, {
        email: 'james@gmail.com',
        password: '3',
        displayName: 'James',
        phoneNumber: '0550 505-503',
        token: '3',
    });

    const [Clothes, Transport, Technique, RealEstate] = await Category.create({
       categoryName: 'Clothes',
    }, {
        categoryName: 'Transport',
    }, {
        categoryName: 'Technique',
    }, {
        categoryName: 'Real Estate'
    });

    await Item.create({
        user: Amanda,
        category: Clothes,
        title: 'Hoodie',
        description: 'Cotton',
        image: 'img_1.jpg',
        price: 400,
    }, {
        user: Violette,
        category: Clothes,
        title: 'T-Shirt',
        description: 'Cotton',
        image: 'img_2.jpg',
        price: 500,
    }, {
        user: Chris,
        category: Technique,
        title: 'Phone',
        description: 'Iphone 7 128gb',
        image: 'img_3.jpg',
        price: 600,
    }, {
        user: Amanda,
        category: Transport,
        title: 'Honda fit',
        description: '2002 year',
        image: 'img_4.jpg',
        price: 700,
    }, {
        user: Violette,
        category: RealEstate,
        title: 'Apartment',
        description: '2 rooms, balcony',
        image: 'img_5.jpg',
        price: 7000,
    })

    await mongoose.connection.close();
};

run().catch(e => console.error(e));