export default () => ({
    appPort : parseInt(process.env.APP_PORT) || 3000,
    appName : process.env.APP_NAME || 'Nest App'
})