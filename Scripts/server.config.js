//main config for SAPUI5 Demo App
module.exports = {
    root: "./Scripts",
    isDev: true,
    isSecure: false,
    session: {
        host: "localhost",
        port: 6379,
        db: 1,
        secret: "play!",
        secure: false
    },
    http: {
        listen: "localhost",
        port: 3000
    },
    client: {
        apiUrl: "http://localhost:3000",
        debugMode: true
    }
};

