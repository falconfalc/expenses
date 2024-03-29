//@ts-check
const getDbUrl = (username, password, dbname) => {
    return `mongodb+srv://${username}:${password}@mov01.ko1us.mongodb.net/${dbname}?retryWrites=true&w=majority`;
};

export const dbConfig = {
    username: process.env.MONGO_USER,
    password: process.env.MONGO_PWD,
    dbName: 'bills_expenses',
    port: 80,
    config: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        connectTimeoutMS: 4000
    },
    // Careful this setting drops all collections, all data will be lost and unrecoverable!
    startWithCleanDb: false,
    // If ${startWithCleanDb} is enabled the models list should be empty
    cleanSpeficiDbModels: [],
    debugEnabled: false,
    getConnectionUrl: getDbUrl
};