const connectToDb = require('../DB/config/connectToDb');
const {userSchema} = require('../DB/model/modelMongo');
const bcrypt = require('bcrypt');
const logger = require('../logger/logger');

class Container {
    contructor(schema) {
        this.schema = schema;
    };
};

async addUser(obj) {
    try {
        const encriptedPass = bcrypt.hashSync(obj.password)
        await connectToDb();
        const newUser = new userSchema({
            username: obj.username,
            password: encriptedPass,
            email: obj.email,
            address: obj.address,
            age: obj.age,
            phoneNumber: obj.phoneNumber,
            avatar: obj.avatar,
            cart: []
        })
        await newUser.save()
        .then(user => logger.info(`usuario agregado. ${user._id}`))
        .catch(err => logger.error(` error al agregar usuario ${err} `))
        return true;
    } catch (error) {
        logger.error(`error: ${error}`)
    }
}
