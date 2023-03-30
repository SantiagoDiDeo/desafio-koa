
const logger = require("../logger/logger");
const { mariaDb } = require("./config/connectToDb");
const { createTableMaria } = require('./model/modelMariaDb');

const executeOperations = async () => {
    try {
       await createTableMaria();
    } catch (err) {
        logger.error(new Error(err));
    } finally {
        mariaDb.destroy();
    };
};

executeOperations();