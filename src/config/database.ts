export default () => ({
    dbConnection : process.env.DB_CONNECTION || 'mysql',
    dbHost : process.env.DB_HOST || '127.0.0.1',
    dbPort : process.env.DB_PORT || '3306',
    dbDatabase : process.env.DB_DATABASE || 'nest_app',
    dbUsername : process.env.DB_USERNAME || 'root',
    dbPassword : process.env.DB_PASSWORD || '',
    dbSync : process.env.DB_SYNC || true,
    dbLogging : process.env.DB_SYNC || true,
});