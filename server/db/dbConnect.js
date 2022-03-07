//@ts-check
import mongoose from "mongoose";
import _ from 'lodash';
import { dbConfig } from '../config';
import { LOGGER } from '../utils/logger';

const dbConnect = async () => {
    try {
        LOGGER.info('[DB] Connecting to DB!');

        const dbConnection = await mongoose.connect(dbConfig.getConnectionUrl(
            dbConfig.username,
            dbConfig.password,
            dbConfig.dbName
        ),
        dbConfig.config);

        dbConnection.set('debug', dbConfig.debugEnabled);

        dbConnection.connection.on('connected', () => {
            mongoose.connection.db.listCollections().toArray((err, names) => {
                LOGGER.info(`Collection names: ${names}`);
            });
        });

        return dbConnection;
    } catch(error) {
        LOGGER.error('[DB] Error occurred when connecting to DB: ', error);
    }
};

export const getDbConnection = async () => {
    try {
        const dbConnection = await dbConnect();

        if (dbConfig.startWithCleanDb || dbConfig.cleanSpeficiDbModels) {
            _.forEach(dbConnection.models, (model, key) => {
                if (dbConfig.cleanSpeficiDbModels.includes(key)) {
                    LOGGER.info(`[DB] Dropping Model: ${key}`);
                    model.collection.drop();
                }

                if (dbConfig.startWithCleanDb) {
                    LOGGER.info(`[DB] Dropping Model: ${key}`);
                    model.collection.drop();
                }
            });
        }

        return dbConnection;
    } catch(error) {

    };
};