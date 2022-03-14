const indexR = require("./index");
const usersR = require("./users");
const toysR = require("./toys");

exports.routesInit = (app) => {
    app.use("/", indexR);

    app.use("/users", usersR);
    app.use("/toys", toysR);
}

exports.corsAccessControl = (app) => {
    app.all('*', (req, res, next) => {
        if (!req.get('Origin')) return next();
        // * -> במציאות במקום כוכבית נכניס שם דומיין שיש לו אישור גישה
        // לשרת
        res.set('Access-Control-Allow-Origin', '*');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
        res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,auth-token,auth-token');
        next();
    });
}