module.exports = (app) => {
    // '/'
    app.use('/', require('./routes/index'));

    // '/servers'
    app.use('/servers', require('./routes/index'));

    // '/server'
    app.use('/server', require('./routes/index'));

    // '/authorize'
    app.use('/authorize', require('./routes/discord'));

    // '/logout'
    app.use('/logout', require('./routes/discord'));

    // '/me'
    app.use('/me', require('./routes/index'));

    // '/docs'
    app.use('/docs', require('./routes/index'));
}